import Pusher from "pusher-js";
import Echo from 'laravel-echo'

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}


export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  window.Pusher = Pusher;

  // const echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: config.public.pusherAppKey,
  //   cluster: config.public.pusherAppCluster,
  //   forceTLS: true,
    
  //   // authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/broadcasting/auth`,
  //   // auth: {
  //   //   headers: {
  //   //     Authorization: `Bearer ${token}`,
  //   //     Accept: 'application/json'
  //   //   }
  //   // }
  // });

});