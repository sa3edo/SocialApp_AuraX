import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../../../shared/Post/services/post.service';
import { IAllPostsResponse, Post } from '../../../../shared/Post/interface/IAllPostsResponse';
import { PostCardComponent } from "../../../../shared/Post/components/post-card/post-card.component";

@Component({
  selector: 'app-my-post-page',
  imports: [PostCardComponent],
  templateUrl: './my-post-page.component.html',
  styleUrl: './my-post-page.component.css',
})
export class MyPostPageComponent implements OnInit {

  // Inject services
  private postService = inject(PostService);

  userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userId = this.userData?._id;
  // Signals
  myPosts = signal<Post[]>([]);

  ngOnInit(): void {
    this.getMyPosts();
  }

  getMyPosts() {
    this.postService.getUserPosts(this.userId!).subscribe({
      next: (res: IAllPostsResponse) => {
        this.myPosts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



}
