"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface ChatLayoutProps {
    defaultLayout?: number[];
}

export default function ChatLayout({
    defaultLayout = [320, 480],
}: ChatLayoutProps) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}; path=/`;
            }}
        >
            <ResizablePanel defaultSize={defaultLayout[0]} minSize={200}>
                Left Panel
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={defaultLayout[1]} minSize={300}>
                Right Panel
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}