import { Component } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { IChatModel } from '../../services/IChatModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public ENDPOINT: string = 'https://localhost:5000/api/chat';
  private userId: string = 'User#' + Math.floor(Math.random() * 9999);

  constructor(
    public signalRService: SignalrService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    await this.signalRService.startConnection();
    await this.signalRService.addChatListener(this.userId);
    this.startHttpRequest();
    await this.signalRService.joinGroup(this.userId, 'test');
    console.log(this.userId);
  }

  private startHttpRequest = () => {
    this.http.get(this.ENDPOINT).subscribe((res) => {
      console.log(res);
    });
  };

  public getData = () => {
    let data = this.signalRService.data;
    return JSON.stringify(data);
  };
}
