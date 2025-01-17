// import { getServerSession } from '#auth'
import qs from 'qs';

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

    let _params = {
      workingStatus: true
    };
    
    const _qs = qs.stringify(_params, 
      {
        arrayFormat: 'indices',
        encodeValuesOnly: true,
      }
    );
  
    const url = `${config.cmsUrl}/api/users?${_qs}`;

    const req = await fetch(url, requestOptions )
    const res = await req.json();

    if (res) {
      return { status: 'success', data: res.data }
    }

  } catch (error) {
    return { status: 'error', error };
  }

})
