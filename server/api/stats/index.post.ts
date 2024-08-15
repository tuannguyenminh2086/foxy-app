import { getServerSession } from '#auth'
import dayjs from 'dayjs';


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
    const _start_date = dayjs().format('YYYY-MM-DD')
    const _end_date = dayjs().add(1, "day").format('YYYY-MM-DD')
  
    let _params = {
      user_id: _user.id,
      start_date: _start_date,
      end_date: _end_date
    };
  
    const qs = '?' + new URLSearchParams(_params).toString();

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${_user.token}`
      }
    };

    const _url = `${config.cmsUrl}/api/time-tracking/total${qs}`;
    const req = await fetch(_url, requestOptions )
    const res = await req.json();
    if (res) {
      return { status: 'success', data: {...res.data} }
    }
    

  } catch (error) {
    return { status: 'unauthenticated!', error };
  }
})
