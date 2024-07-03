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

  public directories: any = [];
  public directoryPath = '';

  ngOnInit() {
    this.listServers();
    if (localStorage.getItem('serverID')) {
      this.serverID = localStorage.getItem('serverID') || '';
    }
  }

  listServers() {
    this.contentLoading = true;
    this.pteroApi.listServers().subscribe((data: any) => {
      this.servers = data.data;
      if (this.serverID) {
        this.listDirectory();
      }
      this.contentLoading = false;
    });
  }

  onServerSelect() {
    localStorage.setItem('serverID', this.serverID);
    this.directoryPath = '';
    this.listDirectory();
  }

  listDirectory() {
    this.pteroApi
      .listDirectory(this.serverID, this.directoryPath)
      .subscribe((data: any) => {
        let directories = data.data;
        directories = directories.sort((a: any, b: any) => {
          if (a.attributes.is_file && !b.attributes.is_file) {
            return 1;
          }
          if (!a.attributes.is_file && b.attributes.is_file) {
            return -1;
          }
          return a.attributes.name.localeCompare(b.attributes.name);
        });
        this.directories = directories;
      });
  }

  onDirectorySelect(directory: string, addToPath: boolean = false) {
    if (addToPath) {
      this.directoryPath += `/${directory}`;
    } else {
      this.directoryPath = directory;
    }
    this.listDirectory();
  }

  getPathList() {
    const pathList: any = [];
    const pathArray = this.directoryPath.split('/');
    let path = '';
    pathArray.forEach((directory: string) => {
      let label = directory;
      if (directory == '') {
        label = 'container';
        path = '';
      } else {
        path += `/${directory}`;
      }
      pathList.push({ label, path });
    });
    return pathList;
  }
}
