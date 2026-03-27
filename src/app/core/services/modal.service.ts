import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  showDialog = signal<boolean>(false);

  toggleDialog() {
    this.showDialog.update((value) => !value);
  }
}
