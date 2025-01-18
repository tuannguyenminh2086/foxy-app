export default defineEventHandler(async(event) => {

  const session = await requireUserSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const config = useRuntimeConfig();

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${session.secure.token}`
      }
    };
  
    const url = `${config.cmsUrl}/api/event`;

    const req = await fetch(url, requestOptions )
    const res = await req.json();

    if (res) {
      return { status: 'success', data: {...res.data} }
    }

  } catch (error) {
    return { status: 'error', error };
  }

})
