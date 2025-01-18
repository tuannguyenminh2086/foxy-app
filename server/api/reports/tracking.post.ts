

export default defineEventHandler(async(event) => {
  const session = await requireUserSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const config = useRuntimeConfig();
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
        Authorization: `Bearer ${session.secure.token}`
      },
      body: JSON.stringify(payload)
    };
  
    const url = `${config.cmsUrl}/api/report/create`;

    const req = await fetch(url, requestOptions )
    const res = await req.json();

    if (res) {
      return { status: 'success', data: [...res.data] }
    }

  } catch (error) {
    return { status: 'error', error };
  }

})
