export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    type: "text" | "image";
    createdAt: number;
}