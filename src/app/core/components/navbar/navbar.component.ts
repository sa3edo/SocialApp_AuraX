import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STORED_KEYS } from '../../constants/storedKeys';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userData = JSON.parse(localStorage.getItem(STORED_KEYS.userData) || "{}")
  profileImage = "/images/Avatar/SuperSayajin.jpeg"
}
