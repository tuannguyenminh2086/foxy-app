// import Pusher from "pusher-js";
// import Echo from 'laravel-echo'

// export default defineNuxtPlugin(() => {
//   if (typeof window != 'undefined') {
//     window.pusher = Pusher;
//   }

//   const config = useRuntimeConfig();
//   const { data } = useAuth();
//   let token = ''

//   if (data.value) {
//     const _user:any = data.value.user as any;
//     token = _user.token;
//   }

//   const echo = new Echo({
//     broadcaster: 'pusher',
//     key: config.public.pusherAppKey,
//     cluster: config.public.pusherAppCluster,
//     forceTLS: true,
//     authEndpoint: config.public.cmsUrl + `/broadcasting/auth`,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: 'application/json'
//       }
//     }
//   })

//   // console.log(window.Echo, 'plugin')


//   return {
//     provide: {
//       echo: echo,
//       subscribe: (token: string) => {
//         if (window.Echo) {
//           return window.Echo;
//         }
      
//         return window.Echo = new Echo({
//           broadcaster: 'pusher',
//           key: config.public.pusherAppKey,
//           cluster: 'eu',
//           forceTLS: true,
//           authEndpoint: config.public.cmsUrl + `/broadcasting/auth`,
//           auth: {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: 'application/json'
//             }
//           }
//         });
//       },
//       listen: (_echo:Echo, channel: string, event: string, callback: any) => {
//         _echo.private(channel).listen(event, (e:any) => {
//           callback(e);
//         });
//       },
//       leave: (_echo:Echo, channel:string) => {
//         _echo.leave(channel);
//       }
//     }
//   }

// });