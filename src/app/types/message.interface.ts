// This uses C# namiving scheme as it interfaces with the backend
export interface IChatEvent {
    Date: Date;
    Content: string;
    ContentType: 'Join' | 'Leave' | 'Message' | 'System';
    Username: string;
}
