import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { AnimatePresence } from 'framer-motion'
import { motion } from "framer-motion"
import EmojiPicker from './EmojiPicker'
import useSound from 'use-sound'
import { Button } from '../ui/button'
import { ImageIcon, Loader, SendHorizontal, ThumbsUp } from 'lucide-react'
import { usePreferencesStore } from '@/store/usePreferences'
import { sendMessage } from '@/app/actions/message.actions'
import { useSelectedUser } from '@/store/useSelectedUser'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { pusherClient } from "@/lib/pusher-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Message } from '@/app/types/message'

const ChatBottomBar = () => {

    const { selectedUser } = useSelectedUser();
    const { user } = useKindeBrowserClient();
    const queryClient = useQueryClient();


    const [message, setMessage] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { soundEnabled } = usePreferencesStore();
    const [imgUrl, setImgUrl] = useState<string>("");
    const [playSound1] = useSound("/sounds/keystroke1.mp3");
    const [playSound2] = useSound("/sounds/keystroke2.mp3");
    const [playSound3] = useSound("/sounds/keystroke3.mp3");
    const [playSound4] = useSound("/sounds/keystroke4.mp3");
    const [playNotificationSound] = useSound("/sounds/notification.mp3");

    const playSoundFunctions = [playSound1, playSound2, playSound3, playSound4];

    const playRandomKeyStrokeSound = () => {
        const randomIndex = Math.floor(Math.random() * playSoundFunctions.length);
        soundEnabled && playSoundFunctions[randomIndex]();
    };
    const { mutate: sendMessageMutation, isPending } = useMutation({
        mutationFn: sendMessage,

        onSuccess: () => {
            setMessage("");

            if (textAreaRef.current) {
                textAreaRef.current.focus();
            }
        },

        onError: (error) => {
            console.error(error);
        },
    });
    const handleSendMessage = () => {
        if (!message.trim()) return;
        if (!user) return;
        if (!selectedUser) return;

        sendMessageMutation({
            senderId: user.id,
            receiverId: selectedUser.id,
            content: message,
            type: "text",
        });
    };
    // for pusher 
    useEffect(() => {
        if (!user || !selectedUser) return;

        const channelName = `conversation-${[user.id, selectedUser.id]
            .sort()
            .join("-")}`;

        const channel = pusherClient.subscribe(channelName);

        const handleNewMessage = (message: Message) => {
            if (soundEnabled && message.senderId !== user?.id) {
                playNotificationSound();
            }

            queryClient.setQueryData(
                ["messages", user?.id, selectedUser?.id],
                (oldData: any) => {
                    if (!oldData) {
                        return {
                            success: true,
                            messages: [message],
                        };
                    }

                    return {
                        ...oldData,
                        messages: [...oldData.messages, message],
                    };
                }
            );
        };

        channel.bind("new-message", handleNewMessage);

        return () => {
            channel.unbind_all();
            pusherClient.unsubscribe(channelName);
        };
    }, [user, selectedUser, queryClient]);

    return (
        <div className="sticky bottom-0 z-30 flex w-full items-center gap-2 border-t bg-background p-3">
            {!message.trim() && (
                <CldUploadWidget
                    signatureEndpoint="/api/sign-cloudinary-params"
                    onSuccess={(result) => {
                        if (
                            result.info &&
                            typeof result.info !== "string"
                        ) {
                            setImgUrl(result.info.secure_url);
                        }
                    }}
                    onQueuesEnd={(result, { widget }) => {
                        widget.close();
                    }}
                >
                    {({ open }) => {

                        return (
                            <button onClick={() => open()}>
                                <ImageIcon
                                    size={20}
                                    onClick={() => open()}
                                    className='cursor-pointer text-muted-foreground'
                                />
                            </button>
                        );
                    }}
                </CldUploadWidget>
            )}

            <Dialog open={!!imgUrl}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Image Preview</DialogTitle>
                    </DialogHeader>
                    <div>
                        <img
                            src={imgUrl}
                            alt="Image Preview"
                            width={400}
                            height={400}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type='submit'
                            onClick={() => {
                                if (!user || !selectedUser) return;

                                sendMessageMutation({
                                    senderId: user.id,
                                    receiverId: selectedUser.id,
                                    content: imgUrl,
                                    type: "image",
                                });

                                setImgUrl("");
                            }} >
                            Send
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AnimatePresence>
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{
                        opacity: { duration: 0.5 },
                        layout: {
                            type: "spring",
                            bounce: 0.15,
                        },
                    }}
                    className='w-full relative'
                >
                    <Textarea
                        autoComplete='off'
                        placeholder="Type your message here..."
                        rows={1}
                        className='w-full border rounded-full flex items-center h-9 resize-none overflow-hidden
						bg-background min-h-0'
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            playRandomKeyStrokeSound()
                        }}
                        ref={textAreaRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <div className='absolute right-2 bottom-0.5'>
                        <EmojiPicker
                            onChange={(emoji) => {
                                setMessage(message + emoji);
                                if (textAreaRef.current) {
                                    textAreaRef.current.focus();
                                }
                            }}
                        />
                    </div>
                </motion.div>


                {message.trim() ? (
                    <Button
                        className='h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
                        variant={"ghost"}
                        size={"icon"}
                    >
                        <SendHorizontal size={20} className='text-muted-foreground' />
                    </Button>
                ) : (
                    <Button
                        className='h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
                        variant={"ghost"}
                        size={"icon"}
                        onClick={handleSendMessage}
                        disabled={isPending}
                    >
                        {!isPending && (
                            <ThumbsUp
                                size={20}
                                className='text-muted-foreground'
                            />
                        )}
                        {isPending && <Loader size={20} className='animate-spin' />}
                    </Button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ChatBottomBar