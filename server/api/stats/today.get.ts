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
    const _today = dayjs().format('YYYY-MM-DD')
    const _tomorrow = dayjs().add(1, "day").format('YYYY-MM-DD')
    const _yesterday = dayjs().subtract(1, "day").format('YYYY-MM-DD')
  
    let _todayParams = {
      user_id: _user.id,
      start_date: _today,
      end_date: _tomorrow
    };

    let yesterdayParams = {
      user_id: _user.id,
      start_date:_yesterday,
      end_date: _yesterday
    }
  
    const qsToday = '?' + new URLSearchParams(_todayParams).toString();
    const qsYesteray = '?' + new URLSearchParams(yesterdayParams).toString();

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${_user.token}`
      }
    };

    const _urlToday = `${config.cmsUrl}/api/time-tracking/total${qsToday}`;
    const _urlYesterday = `${config.cmsUrl}/api/time-tracking/total${qsYesteray}`;
    const [reqToday, reqYesterday] = await Promise.all([ fetch(_urlToday, requestOptions) , fetch(_urlYesterday, requestOptions)]);

    const resToday = await reqToday.json();
    const resYesterday = await reqYesterday.json();

    if (resToday && resYesterday ) {
      return { status: 'success', data: { 
          today: { ...resToday.data },
          yesterday: {...resYesterday.data }
        }
      }
    }
    

  } catch (error) {
    return { status: 'unauthenticated!', error };
  }
})
