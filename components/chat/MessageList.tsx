import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";

const messages = [
    {
        id: "1",
        senderId: "1",
        messageType: "text",
        content: "Hey! How's your day going?",
        createdAt: "2026-07-11T09:00:00Z",
    },
    {
        id: "2",
        senderId: "2",
        messageType: "text",
        content: "Pretty good! Just finished working on my chat app.",
        createdAt: "2026-07-11T09:01:00Z",
    },
    {
        id: "3",
        senderId: "1",
        messageType: "text",
        content: "Nice! Are you using Next.js?",
        createdAt: "2026-07-11T09:02:00Z",
    },
    {
        id: "4",
        senderId: "2",
        messageType: "text",
        content: "Yep! Next.js, Convex, Clerk, and shadcn/ui.",
        createdAt: "2026-07-11T09:03:00Z",
    },
    {
        id: "5",
        senderId: "1",
        messageType: "image",
        content: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
        createdAt: "2026-07-11T09:04:00Z",
    },
    {
        id: "6",
        senderId: "2",
        messageType: "text",
        content: "Nice workspace! 🔥",
        createdAt: "2026-07-11T09:05:00Z",
    },
    {
        id: "7",
        senderId: "1",
        messageType: "text",
        content: "Thanks! I'm almost done building the chat UI.",
        createdAt: "2026-07-11T09:06:00Z",
    },
    {
        id: "8",
        senderId: "2",
        messageType: "image",
        content: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
        createdAt: "2026-07-11T09:07:00Z",
    },
    {
        id: "9",
        senderId: "1",
        messageType: "text",
        content: "Looks awesome! 🚀",
        createdAt: "2026-07-11T09:08:00Z",
    },
];


const MessageList = () => {

    const currentUser = { id: "1", name: "Alice Johnson", image: "https://i.pravatar.cc/150?img=1" }
    const selectedUser = { id: "2", name: "Bob Smith", image: "https://i.pravatar.cc/150?img=2" }
    return (
        <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
            {/* This component ensure that an animation is applied when items are added to or removed from the list */}
            <AnimatePresence>
                {
                    messages?.map((message, index) => (
                        <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                            transition={{
                                opacity: { duration: 0.1 },
                                layout: {
                                    type: "spring",
                                    bounce: 0.3,
                                    duration: messages.indexOf(message) * 0.05 + 0.2,
                                },
                            }}
                            style={{
                                originX: 0.5,
                                originY: 0.5,
                            }}
                            className={cn(
                                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                                message.senderId === currentUser?.id ? "items-end" : "items-start"
                            )}
                        >
                            <div className='flex gap-3 items-center'>
                                {message.senderId === selectedUser?.id && (
                                    <Avatar className='flex justify-center items-center'>
                                        <AvatarImage
                                            src={selectedUser?.image}
                                            alt='User Image'
                                            className='border-2 border-white rounded-full'
                                        />
                                    </Avatar>
                                )}
                                {message.messageType === "text" ? (
                                    <span className='bg-accent p-3 rounded-md max-w-xs'>{message.content}</span>
                                ) : (
                                    <img
                                        src={message.content}
                                        alt='Message Image'
                                        className='border p-2 rounded h-40 md:h-52 object-cover'
                                    />
                                )}

                                {message.senderId === currentUser?.id && (
                                    <Avatar className='flex justify-center items-center'>
                                        <AvatarImage
                                            src={currentUser?.image || "/user-placeholder.png"}
                                            alt='User Image'
                                            className='border-2 border-white rounded-full'
                                        />
                                    </Avatar>
                                )}
                            </div>
                        </motion.div>
                    ))}


            </AnimatePresence>
        </div>
    );
};
export default MessageList;