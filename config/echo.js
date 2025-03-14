import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    cluster: import.meta.env.VITE_REVERB_CLUSTER,
    disableStats: true,
    authEndpoint: "http://localhost:80/broadcasting/auth",
    auth: {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
    },
});

export default echo;