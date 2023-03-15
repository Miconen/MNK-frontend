import { Component, ElementRef } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.signalRService.startConnection();
    await this.signalRService.addChatListener(this.authService.getUsername());
    this.startHttpRequest();
    await this.signalRService.joinGroup(this.authService.getUsername(), 'test');
  }

  private startHttpRequest = () => {
    this.http.get(this.signalRService.ENDPOINT).subscribe((res) => {
      console.log(res);
    });
  };

  public getData = () => {
    let data = this.signalRService.data;
    return JSON.stringify(data);
  };

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  sendMessage(message: HTMLTextAreaElement, chatWindow: HTMLDivElement) {
    if (message.value.trim() === '') {
      return;
    }

    const date = new Date();

    let userMessage: IChatEvent = {
      Date: date,
      Content: message.value,
      ContentType: 'Message',
      Username: 'testUser',
    };

    this.signalRService.sendMessage(userMessage, 'test');

    /* reset textarea value */
    message.value = '';
    /* chatwindow stays on bottom when there is more messages coming */
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // if message user is not You then align text right
  checkUser(user: string) {
    return user === 'You' ? '' : 'content-right';
  }
}
