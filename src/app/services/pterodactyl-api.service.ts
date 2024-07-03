import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PterodactylApiService {
  private apiUrl: string = '';
  private apiKey: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = localStorage.getItem('apiUrl') || '';
    this.apiKey = localStorage.getItem('apiKey') || '';
  }

  /* ---------------------------------- */
  /*                MISC                */
  /* ---------------------------------- */

  checkAPICredentials() {
    if (this.apiUrl && this.apiKey) {
      return true;
    } else {
      console.error('API URL or API Key not set');
      return false;
    }
  }

  /* ---------------------------------- */
  /*               SERVER               */
  /* ---------------------------------- */

  listServers() {
    if (!this.checkAPICredentials()) return new Observable();

    return this.http.get(`${this.apiUrl}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  listDirectory(serverID: string, directory: string = '') {
    if (!this.checkAPICredentials()) return new Observable();

    directory = directory.replace(/\//g, '%2F');

    return this.http.get(
      `${this.apiUrl}/servers/${serverID}/files/list?directory=${directory}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }
}
