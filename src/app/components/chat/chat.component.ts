import { Component, ElementRef } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  private userId: string = 'User#' + Math.floor(Math.random() * 9999);

  /* this is just for testing */
  public messages: any = [];
  /*  */

  constructor(
    public signalRService: SignalrService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.signalRService.startConnection();
    await this.signalRService.addChatListener(this.userId);
    this.startHttpRequest();
    await this.signalRService.joinGroup(this.userId, 'test');
    console.log(this.userId);
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
    const date = new Date();

    this.messages.push({
      date: date.toLocaleTimeString(),
      message: message.value,
    });
    /* reset textarea value */
    message.value = '';
    /* chatwindow stays on bottom when there is more messages coming */
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}
