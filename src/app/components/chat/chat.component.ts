import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { AuthService } from 'src/app/services/auth.service';
import { IChatEvent } from 'src/app/types/message.interface';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {

    constructor(
        public signalRService: SignalrService,
        private authService: AuthService
    ) { }

    async ngOnInit() {
        await this.signalRService.startConnection();

        const date = new Date();
        let joinEvent: IChatEvent = {
            Date: date,
            Content: "",
            ContentType: 'Join',
            Username: this.authService.getUsername(),
            Roomname: 'test',
            JWT: this.authService.getToken(),
        };

        this.signalRService.connection.on('ReceiveMessage', (username: string, message: string) => {
            let messageEvent: IChatEvent = {
                Date: date,
                Content: message,
                ContentType: 'Message',
                Username: username,
                Roomname: 'test',
                JWT: this.authService.getToken(),
            };
            this.signalRService.data.push(messageEvent);
        });

        await this.signalRService.joinGroup(joinEvent)
    };

    async ngOnDestroy() {
        const date = new Date();
        let leaveEvent: IChatEvent = {
            Date: date,
            Content: "",
            ContentType: 'Leave',
            Username: this.authService.getUsername(),
            Roomname: 'test',
            JWT: this.authService.getToken(),
        };
        this.signalRService.leaveGroup(leaveEvent);
        this.signalRService.getConnection().off("ReceiveMessage");
        this.signalRService.stopConnection();
    }

    public getData = () => {
        let data = this.signalRService.data;
        return JSON.stringify(data);
    };

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    sendMessage(message: HTMLTextAreaElement, chatWindow: HTMLDivElement) {
        if (message.value.trim() === '') return;

        const date = new Date();
        let event: IChatEvent = {
            Date: date,
            Content: message.value,
            ContentType: 'Message',
            Username: this.authService.getUsername(),
            Roomname: 'test',
            JWT: this.authService.getToken(),
        };

        this.signalRService.sendMessage(event);

        /* reset textarea value */
        message.value = '';
        /* chatwindow stays on bottom when there is more messages coming */
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // if message user is not You then align text right
    checkUser(user: string) {
        return user === this.authService.getUsername() ? 'message--self' : 'message--else';
    }
}
