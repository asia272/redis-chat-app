"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelectedUser } from "@/store/useSelectedUser";

interface ChatLayoutProps {
    defaultLayout?: number[];
    users: any[];
}

export default function ChatLayout({
    defaultLayout = [25, 75],
    users,
}: ChatLayoutProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { selectedUser } = useSelectedUser();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}; path=/`;
            }}
        >
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={8}
                collapsible
                minSize={isMobile ? 0 : 24}
                maxSize={isMobile ? 8 : 30}
                onResize={(size: any) => {
                    const collapsed = size === 8;

                    if (collapsed !== isCollapsed) {
                        setIsCollapsed(collapsed);

                        document.cookie = `react-resizable-panels:collapsed=${collapsed}; path=/`;
                    }
                }}
            >
                <Sidebar isCollapsed={isCollapsed} users={users} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                defaultSize={defaultLayout[1]}
                minSize={30}
            >
                {!selectedUser && (
                    <div className='flex justify-center items-center h-full w-full px-10'>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <img src='/logo.png' alt='Logo' className='w-full md:w-2/3 lg:w-1/2' />
                            <p className='text-muted-foreground text-center'>Click on a chat to view the messages</p>
                        </div>
                    </div>
                )}
                {selectedUser && <MessageContainer />}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}