import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IChatEvent } from 'src/app/types/message.interface';

@Injectable({
    providedIn: 'root',
})
export class SignalrService {
    public data: any[]; // Change any type
    public ENDPOINT: string = 'https://localhost:8081/api/hub/chat';
    private hubConnection: signalR.HubConnection;

    constructor() {
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

    public joinGroup = async (event: IChatEvent) => {
        this.hubConnection.invoke(
            'JoinGroup',
            event.Username,
            event.Roomname,
            event.JWT,
        );
        this.hubConnection.invoke(
            'SendMessageToGroup',
            event
        );
    };

    public sendMessage = async (event: IChatEvent) => {
        this.hubConnection.invoke(
            'SendMessageToGroup',
            event,
        );
    };
}
