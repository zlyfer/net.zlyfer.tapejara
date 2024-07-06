import { Component, OnInit } from '@angular/core';

import { PterodactylApiService } from '@service/pterodactyl-api.service';
import { SignalHomeService } from '@service/signals/home.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.page.html',
  styleUrls: ['./console.page.scss'],
})
export class ConsolePage implements OnInit {
  constructor(
    private pteroApi: PterodactylApiService,
    private signalHomeService: SignalHomeService
  ) {}

  public serverID: string = '';

  ngOnInit() {
    this.signalHomeService.selectedServer$.subscribe((data) => {
      if (data) {
        this.serverID = data;
      }
    });
  }
}
