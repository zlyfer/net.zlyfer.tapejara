import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalHomeService {
  private serverObject = new BehaviorSubject<any>(null);
  public selectedServer$ = this.serverObject.asObservable();

  constructor() {}

  setSelectedServer(data: any): void {
    this.serverObject.next(data);
  }

  getSelectedServer(): any {
    return this.serverObject.getValue();
  }
}
