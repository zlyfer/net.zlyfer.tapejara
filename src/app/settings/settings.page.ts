import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor() {}

  public apiUrl: string = '';
  public apiKey: string = '';

  ngOnInit() {
    this.apiUrl = localStorage.getItem('apiUrl') || '';
    this.apiKey = localStorage.getItem('apiKey') || '';
  }

  updateCredentials(): void {
    localStorage.setItem('apiUrl', this.apiUrl);
    localStorage.setItem('apiKey', this.apiKey);
  }
}
