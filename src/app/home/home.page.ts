import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { PterodactylApiService } from '@service/pterodactyl-api.service';
import { ServerSelectPage } from '../modals/serverselect/serverselect.page';
import { SignalHomeService } from '@service/signals/home.service';

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
    private signalHomeService: SignalHomeService
  ) {}

  public contentLoading = true;
  public servers: any = [];
  public serverID: string = '';

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
  }
  loadServers() {
    this.contentLoading = true;
    this.pteroApi.loadServers().subscribe((data: any) => {
      this.servers = data.data;
      this.contentLoading = false;
    });
  }

  onTabChange(event: { tab: string }) {
    localStorage.setItem('selectedTab', event.tab);
  }

  openChangeServerModal() {
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
          this.serverID = data.data;
          this.onServerSelect();
          this.signalHomeService.setSelectedServer(data.data);
        }
      });
  }

  onServerSelect() {
    localStorage.setItem('serverID', this.serverID);
  }

  getCurrentServer() {
    return this.servers.find(
      (server: any) => server.attributes.identifier === this.serverID
    );
  }
}
