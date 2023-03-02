import { Component } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { IChatModel } from '../../services/IChatModel';
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
  public messages: any = [
    { user: 'testuser1', message: 'hello' },
    { user: 'testuser', message: 'testing message' },
  ];
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
}
