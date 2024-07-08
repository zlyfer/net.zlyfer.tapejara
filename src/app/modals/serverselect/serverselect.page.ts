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

  public selectServer(serverID: string = ''): void {
    this.modalController.dismiss(serverID);
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
