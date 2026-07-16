import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelectedUser } from "@/store/useSelectedUser";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/actions/message.actions";
import type { Message } from "@/app/types/message";
import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";


const MessageList = () => {

    const { selectedUser } = useSelectedUser()


    const { user: currentUser } = useKindeBrowserClient();
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["messages", currentUser?.id, selectedUser?.id],
        queryFn: () =>
            getMessages({
                senderId: currentUser!.id,
                receiverId: selectedUser!.id,
            }),
        enabled: !!currentUser && !!selectedUser,
    });
    // Scroll to the bottom of the message container when new messages are added
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <div ref={messageContainerRef} className='w-full overflow-y-auto overflow-x-hidden  flex flex-col'>
            {/* This component ensure that an animation is applied when items are added to or removed from the list */}
            <AnimatePresence>
                {
                    !isLoading && data?.messages?.map((message: Message, index) => (
                        <motion.div
                            key={message.id}
                            layout
                            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                            transition={{
                                opacity: { duration: 0.1 },
                                layout: {
                                    type: "spring",
                                    bounce: 0.3,
                                    duration: index * 0.05 + 0.2,
                                },
                            }}
                            style={{
                                originX: 0.5,
                                originY: 0.5,
                            }}
                            className={cn(
                                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                                message?.senderId === currentUser?.id ? "items-end" : "items-start"
                            )}
                        >
                            <div className='flex gap-3 items-center'>
                                {message?.senderId === selectedUser?.id && (
                                    <Avatar className='flex justify-center items-center'>
                                        <AvatarImage
                                            src={selectedUser?.image}
                                            alt='User Image'
                                            className='border-2 border-white rounded-full'
                                        />
                                    </Avatar>
                                )}
                                {message?.type === "text" ? (
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
                                            src={currentUser?.picture || "/user-placeholder.png"}
                                            alt='User Image'
                                            className='border-2 border-white rounded-full'
                                        />
                                    </Avatar>
                                )}
                            </div>
                        </motion.div>
                    ))}
                {isLoading &&
                    <>
                        <MessageSkeleton />
                        <MessageSkeleton />
                        <MessageSkeleton />
                        <MessageSkeleton />
                    </>}

            </AnimatePresence>
        </div>
    );
};
export default MessageList;