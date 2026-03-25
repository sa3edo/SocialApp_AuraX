import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../core/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SuggestedFriendsComponent } from "../../Components/suggested-friends/suggested-friends.component";
import { ToastComponent } from "../../../../shared/Components/toast/toast.component";

@Component({
  selector: 'app-home-page',
  imports: [SidebarComponent, RouterOutlet, SuggestedFriendsComponent, ToastComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

}
