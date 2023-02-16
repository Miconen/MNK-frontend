import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IChatModel } from './IChatModel';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public data: string[];
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.data = [];
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5000/chat')
      .build();
  }

  public startConnection = async () => {
    await this.hubConnection.start();
    let CONNECTED = this.hubConnection.state === 'Connected';
    if (!CONNECTED) {
      console.log('Error occurred with the chat connection');
      return;
    }
    console.log('Connection started');
    return;
  };

  public addChatListener = async (userId: string) => {
    console.log('Attaching chat listener');
    const getYou = (messageUser: string) =>
      userId === messageUser ? 'You' : messageUser;
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.data.push(`${getYou(user)}: ${message}`);
    });
  };

  public joinGroup = async (userId: string, groupName: string) => {
    this.hubConnection.invoke('JoinGroup', userId, groupName);
    this.hubConnection.invoke(
      'SendMessageToGroup',
      userId,
      'Test message',
      groupName
    );
  };
}
