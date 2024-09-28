import { getServerSession } from '#auth'

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
      action: body.action,
      task_id: body.tid
    }

    if (!body.tid || !body.action) {
      throw new Error('missing data');
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

    const url = `${config.cmsUrl}/api/time-tracking`;
    const req = await fetch(url, requestOptions )
    const res = await req.json();

    if (res) {
      return { status: 'success' }
    }

  } catch (error) {
    return { status: 'error', error };
  }

})
