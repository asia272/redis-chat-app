
import { useSelectedUser } from "@/store/useSelectedUser";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, X } from "lucide-react";

const ChatTopBar = () => {
    const { selectedUser, setSelectedUser } = useSelectedUser();

    if (!selectedUser) return null;

    return (
        <div className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={selectedUser.image || "/user-placeholder.png"}
                        alt={selectedUser.firstName}
                        className="rounded-full object-cover"
                    />
                </Avatar>

                <div>
                    <h2 className="truncate font-semibold">
                        {selectedUser.firstName}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="rounded-md p-2 hover:bg-muted">
                    <Info className="h-5 w-5 text-muted-foreground" />
                </button>

                <button
                    onClick={() => setSelectedUser(null)}
                    className="rounded-md p-2 hover:bg-muted"
                >
                    <X className="h-5 w-5 text-muted-foreground" />
                </button>
            </div>
        </div>
    );
};

export default ChatTopBar;