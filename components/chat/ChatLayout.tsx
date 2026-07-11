"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import MessageContainer from "./MessageContainer";

interface ChatLayoutProps {
    defaultLayout?: number[];
}

export default function ChatLayout({
    defaultLayout = [25, 75],
}: ChatLayoutProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                <Sidebar isCollapsed={isCollapsed} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                defaultSize={defaultLayout[1]}
                minSize={30}
            >
                <MessageContainer />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}