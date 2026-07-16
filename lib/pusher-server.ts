import PusherServer from "pusher";

declare global {
    var pusherServer: PusherServer | undefined;
}

// Server-side Pusher

export const pusherServer = global.pusherServer || new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: "ap2",
    useTLS: true,
});
