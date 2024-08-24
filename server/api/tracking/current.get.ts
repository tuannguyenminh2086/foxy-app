import { getServerSession } from '#auth'

export default defineEventHandler(async(event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const config = useRuntimeConfig();
    const _user: any = session.user;
    const _query = getQuery(event)

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${_user.token}`
      }
    };

    const url = `${config.cmsUrl}/api/time-tracking?isWorking=${_query.isWorking}&trackedUser=${_user.id}`;
    const req = await fetch(url, requestOptions )
    const res = await req.json();

    if (res) {
      return { status: 'success', data: {...res.data[0]} }
    }

  } catch (error) {
    return { status: 'error', error };
  }

})
