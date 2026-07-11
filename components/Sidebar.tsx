
import React from 'react'
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { usePreferencesStore } from '@/store/usePreferences';
import useSound from 'use-sound';
import { cn } from '@/lib/utils';


const users = [
    { id: "1", name: "Alice Johnson", imageUrl: "https://i.pravatar.cc/150?img=1" },
    { id: "2", name: "Bob Smith", imageUrl: "https://i.pravatar.cc/150?img=2" },
    { id: "3", name: "Charlie Brown", imageUrl: "https://i.pravatar.cc/150?img=3" },
    { id: "4", name: "David Wilson", imageUrl: "https://i.pravatar.cc/150?img=4" },
    { id: "5", name: "Emma Davis", imageUrl: "https://i.pravatar.cc/150?img=5" },
];

interface SidebarProps {
    isCollapsed: boolean;

}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
    const { soundEnabled, setSoundEnabled } = usePreferencesStore();

    const [playClick] = useSound("/sounds/mouse-click.mp3");
    return (
        <div className='group relative flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2  max-h-full overflow-auto bg-background'>
            {!isCollapsed && (
                <div className='flex justify-between p-2 items-center'>
                    <div className='flex gap-2 items-center text-2xl'>
                        <p className='font-medium'>Chats</p>
                    </div>
                </div>
            )}

            <ScrollArea className='gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                {users.map((user, idx) =>
                    isCollapsed ? (
                        <TooltipProvider key={idx}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <div
                                        onClick={() => {
                                            soundEnabled && playClick();

                                        }}
                                    >
                                        <Avatar className='my-1 flex justify-center items-center'>
                                            <AvatarImage
                                                src={user.imageUrl || "/user-placeholder.png"}
                                                alt='User Image'
                                                className='border-2 border-white rounded-full w-10 h-10'
                                            />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className='sr-only'>{user.name}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side='right' className='flex items-center gap-4'>
                                    {user.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <Button
                            key={idx}
                            variant={"grey"}
                            size='xl'
                            className={cn(
                                "w-full justify-start gap-4 my-1",
                            )}
                            onClick={() => {
                                soundEnabled && playClick();

                            }}
                        >
                            <Avatar className='flex justify-center items-center'>
                                <AvatarImage
                                    src={user.imageUrl || "/user-placeholder.png"}
                                    alt={"User image"}
                                    className='w-10 h-10'
                                />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col max-w-28'>
                                <span>{user.name}</span>
                            </div>
                        </Button>
                    )
                )}
            </ScrollArea>
        </div>
    )
}

export default Sidebar