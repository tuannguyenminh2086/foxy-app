import Echo from 'laravel-echo';

export {};

declare global {
  interface Window {
    pusher: Pusher;
    Echo: Echo;
  }
}
