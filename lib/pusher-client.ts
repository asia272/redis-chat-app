
import PusherClient from "pusher-js";


declare global {

    var pusherClient: PusherClient | undefined;
}

// Client-side Pusher

export const pusherClient = global.pusherClient || new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        cluster: "ap2",
    }
);