import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IChatEvent } from 'src/app/types/message.interface';

@Injectable({
    providedIn: 'root',
})
export class SignalrService {
    public data: IChatEvent[];
    public ENDPOINT: string = 'https://localhost:8081/api/hub/chat';
    public connection: signalR.HubConnection;

    constructor() {
        this.data = [];
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this.ENDPOINT)
            .build();
    }

    public async startConnection() {
        if (this.isConnected()) return;
        await this.connection.start();
    };

    public async stopConnection() {
        if (!this.isConnected()) return;
        await this.connection.stop();
        this.data = [];
    };

    public getConnection() {
        return this.connection;
    }

    public isConnected() {
        return this.getConnection().state == signalR.HubConnectionState.Connected;
    }

    public leaveGroup = async (event: IChatEvent) => {
        if (!this.isConnected()) return;
        this.data.push(event);
        this.getConnection().invoke(
            'LeaveGroup',
            event
        );
    };

    public joinGroup = async (event: IChatEvent) => {
        if (!this.isConnected()) return;
        this.data.push(event);
        this.getConnection().invoke(
            'JoinGroup',
            event
        );
    };

    public sendMessage = async (event: IChatEvent) => {
        if (!this.isConnected()) return;
        this.data.push(event);
        this.getConnection().invoke(
            'SendMessageToGroup',
            event,
        );
    };
}
