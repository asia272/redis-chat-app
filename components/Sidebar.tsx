import React from 'react'

interface SidebarProps {
    isCollapsed: boolean;

}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
    return (
        <div className='group relative flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2  max-h-full overflow-auto bg-background'>
            {!isCollapsed && (
                <div className='flex justify-between p-2 items-center'>
                    <div className='flex gap-2 items-center text-2xl'>
                        <p className='font-medium'>Chats</p>
                    </div>
                </div>
            )}</div>
    )
}

export default Sidebar