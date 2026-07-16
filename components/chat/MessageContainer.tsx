import React, { useEffect } from 'react'
import ChatTopBar from './ChatTopBar'
import MessageList from './MessageList'
import ChatBottomBar from './ChatBottomBar'
import { useSelectedUser } from '@/store/useSelectedUser'

const MessageContainer = () => {

    const { setSelectedUser } = useSelectedUser();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedUser(null);
        };

        document.addEventListener("keydown", handleEscape);

        return () => document.removeEventListener("keydown", handleEscape);
    }, [setSelectedUser]);

    return (
        <div className='flex- flex-col justify-between w-full h-full overflow-y-auto overflow-x-hidden'>
            <ChatTopBar />

            <div className='w-full  h-full flex flex-col'>

                <MessageList />
                <ChatBottomBar />

            </div>
        </div>
    )
}

export default MessageContainer