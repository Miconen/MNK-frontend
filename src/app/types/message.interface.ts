export interface IChatEvent {
  date: Date;
  content: string;
  contentType: 'Join' | 'Leave' | 'Message' | 'System';
  user?: {
    name: string;
    id: number;
  };
}
