import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private wsSocket: any;
  public message$ = new Subject<any>();

  connectSocket(socketUrl: string, token: string) {
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

  private async sendAuthMessage(token: string) {
    if (this.wsSocket && this.wsSocket.readyState === WebSocket.OPEN) {
      const authMessage = `{"event":"auth","args":["${token}"]}`;
      this.wsSocket.send(authMessage);
    } else {
      console.error('WebSocket is not open. Cannot send auth message.');
    }
  }

  private handleMessage(message: string) {
    this.message$.next(JSON.parse(message));
  }

  sendMessage(message: string) {
    if (this.wsSocket && this.wsSocket.readyState === WebSocket.OPEN) {
      this.wsSocket.send(message);
    } else {
      console.error(
        'WebSocket is not open. ReadyState:',
        this.wsSocket.readyState
      );
    }
  }

  closeSocket() {
    if (this.wsSocket) {
      this.wsSocket.close();
    }
  }
}
