import { AfterViewInit, Component, computed, effect, inject, OnInit, Renderer2 } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  private readonly progressBarService = inject(ProgressBarService);
  private readonly renderer = inject(Renderer2);
  showProgress = computed(() => this.progressBarService.showProgressBar());


  // showBar = effect(() => {
  //   this.showProgress()
  //   console.log("من داخل الافيكت");
  //   if (this.showProgress()) {
  //     console.log("True");
  //     this.renderer.removeClass(document.getElementById('bar'), 'hide-progress');
  //     this.renderer.addClass(document.getElementById('bar'), 'show-progress');
  //   } else {
  //     console.log("False");
  //     this.renderer.removeClass(document.getElementById('bar'), 'show-progress');
  //     this.renderer.addClass(document.getElementById('bar'), 'hide-progress');
  //   }
  // });


}
