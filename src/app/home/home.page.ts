import { Component, OnInit } from '@angular/core';

import { PterodactylApiService } from '@service/pterodactyl-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private pteroApi: PterodactylApiService) {}

  public contentLoading = true;

  public servers: any = [];
  public serverID: string = '';

  public fileList: any = [];
  public directoryPath = '';

  ngOnInit() {
    this.loadServers();
    if (localStorage.getItem('serverID')) {
      this.serverID = localStorage.getItem('serverID') || '';
    }
  }

  loadServers() {
    this.contentLoading = true;
    this.pteroApi.loadServers().subscribe((data: any) => {
      this.servers = data.data;
      this.contentLoading = false;
    });
  }

  onServerSelect() {
    localStorage.setItem('serverID', this.serverID);
    this.directoryPath = '';
  }

  getCurrentServer() {
    return this.servers.find(
      (server: any) => server.attributes.identifier === this.serverID
    );
  }
}
