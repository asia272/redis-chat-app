"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";

interface ChatLayoutProps {
    defaultLayout?: number[];
}

export default function ChatLayout({
    defaultLayout = [320, 480],
}: ChatLayoutProps) {
    const [isMobile, setIsMobile] = useState(false);

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
                minSize={isMobile ? 0 : 200}
            >
                Left Panel
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                defaultSize={defaultLayout[1]}
                minSize={300}
            >
                Right Panel
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}