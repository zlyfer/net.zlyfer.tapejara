import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-serverselect',
  templateUrl: './serverselect.page.html',
  styleUrls: ['./serverselect.page.scss'],
})
export class ServerSelectPage implements OnInit {
  constructor(private modalController: ModalController) {}

  @Input() servers: any = [];
  @Input() selectedServer: string = '';

  ngOnInit() {}

  selectServer(serverID: string = '') {
    this.modalController.dismiss(serverID);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}