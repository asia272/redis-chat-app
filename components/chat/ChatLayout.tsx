"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

interface ChatLayoutProps {
    defaultLayout?: number[];
}

export default function ChatLayout({
    defaultLayout = [320, 480],
}: ChatLayoutProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Check once on mount
        checkScreenSize();

        // Listen for resize
        window.addEventListener("resize", checkScreenSize);

        // Cleanup
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
                collapsible={true}
                minSize={isMobile ? 0 : 24}
                maxSize={isMobile ? 8 : 30}
            >
                <Sidebar />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                defaultSize={defaultLayout[1]}
                minSize={30}
            >
                Right Panel
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}