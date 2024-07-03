import { Injectable } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class FileIconService {
  constructor() {}

  getFolderIcon() {
    return far['faFolder'];
  }

  getFileIcon(filename: string) {
    const extension: any = filename.split('.').pop();

    switch (extension.toLowerCase()) {
      case 'pdf':
        return far['faFilePdf'];
      case 'doc':
      case 'docx':
        return far['faFileWord'];
      case 'xls':
      case 'xlsx':
        return far['faFileExcel'];
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return far['faFileImage'];
      case 'mp4':
      case 'avi':
      case 'mov':
        return far['faFileVideo'];
      case 'mp3':
      case 'wav':
        return far['faFileAudio'];
      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
      case 'gz':
        return far['faFileArchive'];
      case 'html':
      case 'css':
      case 'js':
      case 'json':
      case 'ts':
        return far['faFileCode'];
      default:
        return far['faFile'];
    }
  }
}
