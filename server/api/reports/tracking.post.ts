import { getServerSession } from '#auth';

export default defineEventHandler(async(event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const config = useRuntimeConfig();
    const _user: any = session.user;
    const body = await readBody(event)

    const payload = {
     ...body,
     export_type: 'no_export',
     groupByUser: true
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${_user.token}`
      },
      body: JSON.stringify(payload)
    };
  
    const url = `${config.cmsUrl}/api/report/create`;

    const req = await fetch(url, requestOptions )
    const res = await req.json();

    if (res) {
      console.log(res)
      return { status: 'success', data: [...res.data] }
    }

  } catch (error) {
    return { status: 'error', error };
  }

})
