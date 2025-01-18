import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)
  
  const payload = Object.assign({},{
    email,
    password,
    device_name: 'desktop app'
  })

  const res = await fetch(`${runtimeConfig.cmsUrl}/api/authentication/token`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  })

  const ret = await res.json();

  if (ret) {
    await setUserSession(event, {
      user: ret.user,
      secure: {
        token: ret.token,
      },
      permissions: ret.permissions,
      status: ret.status,
      expiredToken: ret.expiredToken
    })


    return {
      permissions: ret.permissions,
      status: ret.status,
      expiredToken: ret.expiredToken
    }
  }

throw createError({
  statusCode: 401,
  message: 'Bad credentials'
})

})