import { Component, OnInit } from '@angular/core';

import { FileIconService } from '@service/file-icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { PterodactylApiService } from '@service/pterodactyl-api.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.page.html',
  styleUrls: ['./file-explorer.page.scss'],
})
export class FileExplorerPage implements OnInit {
  constructor(
    private pteroApi: PterodactylApiService,
    public fileIconService: FileIconService
  ) {}

  public serverID: string = '';
  public fileList: any = [];
  public directoryPath = '';

  ngOnInit() {
    if (localStorage.getItem('serverID')) {
      this.serverID = localStorage.getItem('serverID') || '';
      this.onServerSelect();
    }
  }

  onServerSelect() {
    localStorage.setItem('serverID', this.serverID);
    this.directoryPath = '';
    this.loadDirectory();
  }

  loadDirectory() {
    this.pteroApi
      .loadDirectory(this.serverID, this.directoryPath)
      .subscribe((data: any) => {
        let fileList = data.data;
        fileList = fileList.sort((a: any, b: any) => {
          if (a.attributes.is_file && !b.attributes.is_file) {
            return 1;
          }
          if (!a.attributes.is_file && b.attributes.is_file) {
            return -1;
          }
          return a.attributes.name.localeCompare(b.attributes.name);
        });
        this.fileList = fileList;
      });
  }

  onDirectorySelect(directory: any, addToPath: boolean = false) {
    let dirName = '';
    if (typeof directory === 'string') {
      dirName = directory;
    } else {
      dirName = directory.attributes.name;
    }

    if (addToPath) {
      this.directoryPath += `/${dirName}`;
    } else {
      this.directoryPath = dirName;
    }
    this.loadDirectory();
  }

  onFileSelect(file: any) {
    console.debug(`file:`, file);
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

  getIcon(extension: string): IconDefinition {
    return this.fileIconService.getFileIcon(extension);
  }
}
