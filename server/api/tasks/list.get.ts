import { getServerSession } from '#auth'
import qs from 'qs';

export default defineEventHandler(async(event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const config = useRuntimeConfig();
    const _user: any = session.user;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${_user.token}`
      }
    };

    let _params = {
      state: '1,2,3,4',
      isQuickRecord: false,
      assignedTo: _user.id,
    };
    
    const _qs = qs.stringify(_params, {
            arrayFormat: 'indices',
            encodeValuesOnly: true,
          });
  
    const url = `${config.cmsUrl}/api/tasks?${_qs}`;

    const req = await fetch(url, requestOptions )
    const res = await req.json();

    if (res) {
      return { status: 'success', data: {...res.data} }
    }

  } catch (error) {
    return { status: 'error', error };
  }

})
