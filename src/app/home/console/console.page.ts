import { Component, OnInit } from '@angular/core';
import { ViewChild, Renderer2 } from '@angular/core';

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
    console.debug(`ngOnInit`);
    this.signalHomeService.selectedServer$.subscribe((data) => {
      if (data) {
        this.serverID = data;
        this.ws_connectSocket();
      }
    });
  }

  /* ------------ Websocket ----------- */

  private ws_connectSocket(): void {
    this.pteroApi.getSocket(this.serverID).subscribe((data: any) => {
      this.clearConsole();
      this.webSocketService.closeSocket();
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

  /* -------------- Other ------------- */

  public sendCommand(event: any): void {
    const command = event.target.value;
    const message = {
      event: 'send command',
      args: [command],
    };
    // if () {

    this.webSocketService.sendMessage(JSON.stringify(message));
    this.console_command = '';
    // }
  }

  public handleMessage(message: any): void {
    const event = message.event;
    switch (event) {
      case 'console output':
        const console_message = message.args[0];
        this.addMessageToConsole(console_message);
        break;
      case 'stats':
        const stats = JSON.parse(message.args[0]);
        break;
      case 'status':
        const status = message.args[0];
        this.addSystemMessageToConsole(`Server marked as ${status}...`);
        break;
      case 'auth success':
      case 'token expired':
      case 'token expiring':
        // INFO: Handled in home.page.ts
        break;
      default:
        console.log('Unhandled event:', event);
        break;
    }
  }

  public addMessageToConsole(message: string): void {
    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'message');
    const text = this.renderer.createText(message);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.console.nativeElement, span);
    this.scrollBottomButton();
  }

  public addSystemMessageToConsole(message: string): void {
    const span = this.renderer.createElement('span');
    const system_span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'message');
    this.renderer.addClass(system_span, 'system-message');
    const text = this.renderer.createText(message);
    const system_text = this.renderer.createText('tapejara~ ');
    this.renderer.appendChild(system_span, system_text);
    this.renderer.appendChild(span, system_span);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.console.nativeElement, span);
    this.scrollBottomButton();
  }

  public clearConsole(): void {
    const elements = this.console.nativeElement.querySelectorAll('.message');
    elements.forEach((element: any) => {
      this.renderer.removeChild(this.console.nativeElement, element);
    });
  }

  public scrollBottomButton() {
    this.console.nativeElement.scrollTo({
      top: this.console.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  public canScrollDown(): boolean {
    return (
      this.console.nativeElement.scrollTop <
      this.console.nativeElement.scrollHeight -
        this.console.nativeElement.clientHeight
    );
  }
}
