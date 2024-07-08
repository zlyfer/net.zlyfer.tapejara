import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor() {}

  private wsSocket: any;
  public message$ = new Subject<any>();

  public connectSocket(socketUrl: string, token: string): void {
    const fullUrl = `${socketUrl}?token=${token}`;

    this.wsSocket = new WebSocket(fullUrl);

    this.wsSocket.onopen = async () => {
      await this.sendAuthMessage(token);
    };

    this.wsSocket.onmessage = (event: MessageEvent) => {
      this.handleMessage(event.data);
    };

    this.wsSocket.onclose = (event: CloseEvent) => {
      console.log(`WebSocket Closed: ${event.reason}`);
    };

    this.wsSocket.onerror = (error: Event) => {
      console.error('WebSocket Error:', error);
    };
  }

  public sendMessage(message: string): void {
    if (this.wsSocket && this.wsSocket.readyState === WebSocket.OPEN) {
      this.wsSocket.send(message);
    } else {
      console.error(
        'WebSocket is not open. ReadyState:',
        this.wsSocket.readyState
      );
    }
  }

  public closeSocket(): void {
    if (this.wsSocket) {
      this.wsSocket.close();
    }
  }

  private sendAuthMessage(token: string): void {
    if (this.wsSocket && this.wsSocket.readyState === WebSocket.OPEN) {
      const authMessage = `{"event":"auth","args":["${token}"]}`;
      this.wsSocket.send(authMessage);
    } else {
      console.error('WebSocket is not open. Cannot send auth message.');
    }
  }

  private handleMessage(_message: string): void {
    const message = JSON.parse(_message);
    console.debug(`message:`, message);
    this.message$.next(message);
  }
}
