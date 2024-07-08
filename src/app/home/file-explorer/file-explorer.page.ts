import { Component, OnInit } from '@angular/core';

import { FileIconService } from '@service/file-icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { PterodactylApiService } from '@service/pterodactyl-api.service';
import { SignalHomeService } from '@service/signals/home.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.page.html',
  styleUrls: ['./file-explorer.page.scss'],
})
export class FileExplorerPage implements OnInit {
  constructor(
    private pteroApi: PterodactylApiService,
    public fileIconService: FileIconService,
    private signalHomeService: SignalHomeService
  ) {}

  public serverID: string = '';
  public fileList: any = [];
  public directoryPath = '';
  public dirLoading: boolean = true;

  ngOnInit() {
    this.signalHomeService.selectedServer$.subscribe((data) => {
      if (data) {
        this.serverID = data;
        this.loadDirectory();
      }
    });
  }

  public onDirectorySelect(directory: any, addToPath: boolean = false) {
    let dirName = '';
    if (typeof directory === 'string') {
      dirName = directory;
    } else {
      dirName = directory.attributes.name;
    }

    let newPath = this.directoryPath;
    if (addToPath) {
      newPath += `/${dirName}`;
    } else {
      newPath = dirName;
    }
    this.loadDirectory(newPath);
  }

  public loadDirectory(path: string = '') {
    this.dirLoading = true;
    this.pteroApi.loadDirectory(this.serverID, path).subscribe((data: any) => {
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
      this.directoryPath = path;
      this.dirLoading = false;
    });
  }

  public onFileSelect(file: any) {
    console.debug(`file:`, file);
  }

  public getPathList() {
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

  public getIcon(extension: string): IconDefinition {
    return this.fileIconService.getFileIcon(extension);
  }
}
