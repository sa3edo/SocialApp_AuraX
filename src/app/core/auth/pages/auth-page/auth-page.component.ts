import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, ActivatedRoute, Router } from '@angular/router';
import { ToastComponent } from "../../../../shared/Components/toast/toast.component";

@Component({
  selector: 'app-auth-page',
  imports: [RouterOutlet, RouterLinkWithHref, ToastComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent implements OnInit {
  private readonly router = inject(Router);
  activeTab!: string

  ngOnInit(): void {

    this.getActiveTab();
    console.log(this.activeTab);
  }

  getActiveTab() {
    this.router.url.includes('login') ? this.activeTab = 'login' : this.activeTab = 'signup';
  }
}
