import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  // userId = signal<string>('');
  // userData = JSON.parse(localStorage.getItem('userData') || '{}');
  // ngOnInit(): void {
  //   this.getUserId();
  // }
  // getUserId() {
  //   if (localStorage.getItem('userData')) {
  //     this.userId.set(this.userData?._id);
  //   }
  // }

}
