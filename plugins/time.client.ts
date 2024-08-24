import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      duration: (seconds: number) => {
        return dayjs.duration( seconds, 'seconds').format('HH:mm:ss').toString();
      },
      formatDate: (msg: string, format: string = 'DD MMM, YYYY') => {
        if (msg !== '') {
          return dayjs(msg).format(format)
        }
        
        return 'N/A'
      }
    }
  }
});

