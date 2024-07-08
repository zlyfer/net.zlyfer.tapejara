import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { PterodactylApiService } from '@service/pterodactyl-api.service';
import { ServerSelectPage } from '../modals/serverselect/serverselect.page';
import { SignalHomeService } from '@service/signals/home.service';
import { WebSocketService } from '@service/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private pteroApi: PterodactylApiService,
    private router: Router,
    private modalController: ModalController,
    private signalHomeService: SignalHomeService,
    private webSocketService: WebSocketService
  ) {}

  public contentLoading = true;
  public servers: any = [];
  public serverID: string = '';
  public serverStatus: string = '';

  ngOnInit() {
    this.loadServers();
    if (localStorage.getItem('serverID')) {
      this.serverID = localStorage.getItem('serverID') || '';
      this.signalHomeService.setSelectedServer(this.serverID);
    }

    const selectedTab = localStorage.getItem('selectedTab');
    if (selectedTab) {
      this.router.navigate([`/home/${selectedTab}`]);
    }

    this.webSocketService.message$.subscribe((message: any) => {
      const event = message.event;
      switch (event) {
        case 'auth success':
          const sendLogs = { event: 'send logs', args: [null] };
          this.webSocketService.sendMessage(JSON.stringify(sendLogs));
          break;
        case 'token expiring':
        case 'token expired':
          console.log('Token expiring or expired. Re-authenticating.');
          this.pteroApi.getSocket(this.serverID).subscribe((data: any) => {
            this.webSocketService.closeSocket();
            this.webSocketService.connectSocket(
              data.data.socket,
              data.data.token
            );
          });
          break;
        case 'status':
          this.serverStatus = message.args[0];
          break;
        case 'stats':
          const stats = JSON.parse(message.args[0]);
          this.serverStatus = stats.state;
          break;
        case 'console output':
          // INFO: Handled in console.page.ts
          break;
        default:
          console.log('Unhandled event:', event);
          break;
      }
    });
  }

  public loadServers() {
    this.contentLoading = true;
    this.pteroApi.loadServers().subscribe((data: any) => {
      this.servers = data.data;
      this.contentLoading = false;
    });
  }

  public onTabChange(event: { tab: string }) {
    localStorage.setItem('selectedTab', event.tab);
  }

  public openChangeServerModal() {
    this.modalController
      .create({
        component: ServerSelectPage,
        componentProps: {
          selectedServer: this.serverID,
          servers: this.servers,
        },
        cssClass: 'modal',
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((data) => {
        if (data.data) {
          this.webSocketService.closeSocket();
          this.serverID = data.data;
          this.onServerSelect();
          this.signalHomeService.setSelectedServer(data.data);
        }
      });
  }

  public onServerSelect() {
    localStorage.setItem('serverID', this.serverID);
  }

  public getCurrentServer() {
    return this.servers.find(
      (server: any) => server.attributes.identifier === this.serverID
    );
  }
}
