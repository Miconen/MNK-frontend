import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IChatModel } from './IChatModel';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public data: IChatModel[];
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.data = [];
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5000/chat')
      .build();
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addChatListener = () => {
    this.hubConnection.on('messageReceived', (data) => {
      this.data = data.message;
      console.log(data.message);
    });
  };
}
