import { getServerSession } from '#auth'
import dayjs from 'dayjs';
import qs from 'qs';


interface IResponse {
  status: string,
  data?: any
  error?: any
}

export default defineEventHandler(async(event) => {

  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const config = useRuntimeConfig();
    const _user: any = session.user


    const _start = dayjs().day(0).format('YYYY-MM-DD')
    const _end = dayjs().day(6).format('YYYY-MM-DD')
  
    let _params = {
      user_id: _user.id,
      start_date: _start,
      end_date: _end
    };

    const _qs = qs.stringify(_params, {
      arrayFormat: 'indices',
      encodeValuesOnly: true,
    });

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${_user.token}`
      }
    };

    const _url = `${config.cmsUrl}/api/time-tracking/total?${_qs}`;
    const _req = await fetch(_url, requestOptions)
    const res = await _req.json();
    if (res) {
      return { status: 'success', data: { 
          week: { ...res.data }
        }
      }
    }
    

  } catch (error) {
    return { status: 'unauthenticated!', error };
  }
})
