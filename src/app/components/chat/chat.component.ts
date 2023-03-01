import { Component } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { IChatModel } from '../../services/IChatModel';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  private userId: string = 'User#' + Math.floor(Math.random() * 9999);

  constructor(
    public signalRService: SignalrService,
    private http: HttpClient,
    private authService: AuthServiceService
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
}
