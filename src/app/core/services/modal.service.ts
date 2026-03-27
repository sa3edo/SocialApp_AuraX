import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  // Signals
  showDialog = signal<boolean>(false);

  userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userId = signal<string>(this.userData?._id);
  postId = signal<string | null>(null);
  handleShowDialog(postId: string) {
    this.showDialog.set(true);
    console.log("handle show");
    this.postId.set(postId);
    this.userId.set(this.userData?._id);
    console.log("show", this.showDialog());

  }

  handleCloseDialog() {
    console.log("clooosed");
    this.showDialog.set(false);
    this.postId.set(null);
  }
}
