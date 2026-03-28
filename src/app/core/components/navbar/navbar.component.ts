import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STORED_KEYS } from '../../constants/storedKeys';
import { UserService } from '../../services/user.service';
import { IGetMyProfile } from '../../interfaces/IGetMyProfile';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userData = JSON.parse(localStorage.getItem(STORED_KEYS.userData) || "{}")
  profileImage = "/images/Avatar/SuperSayajin.jpeg"


  // inject services
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.getUserData();

  }
  getUserData() {
    this.userService.getMyProfile().subscribe({
      next: (response: IGetMyProfile) => {
        console.log(response);
        console.log(this.userService.following());
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
