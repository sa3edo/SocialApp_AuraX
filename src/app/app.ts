import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/components/footer/footer.component";
import { ToastComponent } from "./shared/Components/toast/toast.component";
import { ProgressBarComponent } from "./core/components/progress-bar/progress-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, ProgressBarComponent],  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SocialApp');
}
