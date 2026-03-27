import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  showProgressBar = signal<boolean>(false);

  showProgress() {
    this.showProgressBar.set(true);
  }
  hideProgress() {
    this.showProgressBar.set(false);
  }
}
