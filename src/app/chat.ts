import { Timestamp } from '@angular/fire/firestore';
import { UserProfile } from "./user-profile";
export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: Date & Timestamp;
    lastMessageUserId?: string;
    userIds: string[];
    users: UserProfile[];

    // Not stored, only for display
    chatPic?: string;
    chatName?: string;


}

export interface Message {
    text: string;
    senderId: string;
    sentDate: Date & Timestamp;
}
