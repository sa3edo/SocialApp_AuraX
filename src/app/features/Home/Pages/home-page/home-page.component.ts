import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../core/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SuggestedFriendsComponent } from "../../Components/suggested-friends/suggested-friends.component";
import { ToastComponent } from "../../../../shared/Components/toast/toast.component";
import { AddPostComponent } from "../../../../shared/Components/add-post/add-post.component";
import { PostLikesComponent } from "../../../../shared/Post/components/post-likes/post-likes.component";

@Component({
  selector: 'app-home-page',
  imports: [SidebarComponent, RouterOutlet, SuggestedFriendsComponent, ToastComponent, AddPostComponent, PostLikesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

}
