import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IChatEvent } from 'src/app/types/message.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public data: any[]; // Change any type
  public ENDPOINT: string = 'https://localhost:8081/api/hub/chat';
  private hubConnection: signalR.HubConnection;

  constructor(private authService: AuthService) {
    this.data = [];
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.ENDPOINT)
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
      this.data.push({ user: getYou(user), content: message });
    });
  };

  public joinGroup = async (userId: string, groupName: string) => {
    this.hubConnection.invoke(
      'JoinGroup',
      userId,
      groupName,
      this.authService.getToken()
    );
    this.hubConnection.invoke(
      'SendMessageToGroup',
      userId,
      'Test message',
      groupName,
      this.authService.getToken()
    );
  };

  public sendMessage = async (userMessage: IChatEvent, groupName: string) => {
    this.hubConnection.invoke(
      'SendMessageToGroup',
      userMessage,
      groupName,
      this.authService.getToken()
    );
  };
}
