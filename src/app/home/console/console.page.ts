import { Component, OnInit } from '@angular/core';
import { ViewChild, Renderer2, ElementRef } from '@angular/core';

import { PterodactylApiService } from '@service/pterodactyl-api.service';
import { SignalHomeService } from '@service/signals/home.service';
import { WebSocketService } from '@service/web-socket.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.page.html',
  styleUrls: ['./console.page.scss'],
})
export class ConsolePage implements OnInit {
  constructor(
    private pteroApi: PterodactylApiService,
    private signalHomeService: SignalHomeService,
    private webSocketService: WebSocketService,
    private renderer: Renderer2
  ) {}

  @ViewChild('console', { static: true }) console: any;

  public serverID: string = '';
  private subscription: any;
  public console_command: string = '';

  ngOnInit() {
    this.signalHomeService.selectedServer$.subscribe((data) => {
      if (data) {
        this.serverID = data;
        this.ws_connectSocket();
      }
    });
  }

  /* ------------ Websocket ----------- */

  ws_connectSocket() {
    this.pteroApi.getSocket(this.serverID).subscribe((data: any) => {
      this.webSocketService.connectSocket(data.data.socket, data.data.token);
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.webSocketService.message$.subscribe(
        (message) => {
          this.handleMessage(message);
        }
      );
    });
  }

  ws_sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }

  // ws_closeConnection() {
  //   this.webSocketService.closeSocket();
  // }

  /* -------------- Other ------------- */

  sendCommand(event: any) {
    const command = event.target.value;
    const message = {
      event: 'send command',
      args: [command],
    };
    this.ws_sendMessage(JSON.stringify(message));
    this.console_command = '';
  }

  handleMessage(message: any) {
    const event = message.event;
    switch (event) {
      case 'auth success':
        break;
      case 'status':
        // Handled in home.page.ts
        break;
      case 'stats':
        const stats = JSON.parse(message.args[0]);
        // console.log('Stats:', stats);
        break;
      case 'console output':
        const console_message = message.args[0];
        console.log('Console Output:', console_message);
        this.addMessageToConsole(console_message);
        break;
      default:
        console.log('Unknown event:', event);
        break;
    }
  }

  addMessageToConsole(message: string) {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(message);
    this.renderer.appendChild(span, text);
    this.renderer.addClass(span, 'message');
    this.renderer.appendChild(this.console.nativeElement, span);
    this.console.nativeElement.scrollTop =
      this.console.nativeElement.scrollHeight;
  }
}
