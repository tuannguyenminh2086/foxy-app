import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { z } from 'zod';

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: runtimeConfig.authJs.secret,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login'
  },
  callbacks: {
    async jwt ({ token, user }: any) {
      if (user) {

        let _name = user.first_name  + ' ' + user.last_name;

        token.user = {
            ...user,
            name: _name,
            image: user.avatar
          }


      }
      return token
    },
    async session({ session, user, token }: any) {
      session.user = token.user;
      return session;
    }
  },
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials:any) {
        const parsedCredentials = z
        .object({ 
          username: z.string().min(2).max(50),
          password: z.string().min(6).max(50)
        })
        .safeParse(credentials);

        if (parsedCredentials.success) {

          const payload = Object.assign({},{
            email: credentials?.username ?? '',
            password: credentials?.password ?? '',
            device_name: 'desktop app'
          })

          const res = await fetch(`${runtimeConfig.cmsUrl}/api/authentication/token`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
          })
  
          const userData = await res.json();  
          if (res.ok && userData) {
            return {
              token: userData.token,
              tokenExpiration: userData?.tokenExpiration ?? 0,
              permissions: userData.permissions,
              roles: userData.roles,
              status: userData.status,
              id: userData.user.id,
              avatar: userData.user.avatar,
              email: userData.user.email,
              username: userData.user.username,
              first_name: userData.user.first_name,
              last_name: userData.user.last_name
            };
          }

        }
        
        return null;
      }
    }),
  ],
})
