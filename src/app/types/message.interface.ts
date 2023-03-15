export interface IChatEvent {
  date: Date;
  content: string;
  contentType: 'Join' | 'Leave' | 'Message' | 'System';
  userName: string;
}
