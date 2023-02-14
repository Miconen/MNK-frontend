import { Component } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { IChatModel } from '../services/IChatModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  constructor(
    public signalRService: SignalrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addChatListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5000/api/chat').subscribe((res) => {
      this.signalRService.data.push(res as IChatModel);
    });
  };

  public getData = () => {
    let data = this.signalRService.data;
    return JSON.stringify(data);
  };
}
