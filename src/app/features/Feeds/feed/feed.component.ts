import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostCardComponent } from "../../../shared/Post/components/post-card/post-card.component";
import { PostService } from '../../../shared/Post/services/post.service';
import { IAllPostsResponse, Post } from '../../../shared/Post/interface/IAllPostsResponse';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoadingSpinnerComponent } from "../../../shared/Components/loading-spinner/loading-spinner.component";
import { PostSkeletonComponent } from "../../../shared/Components/post-skeleton/post-skeleton.component";
import { AddPostComponent } from "../../../shared/Components/add-post/add-post.component";
import { STORED_KEYS } from '../../../core/constants/storedKeys';

@Component({
  selector: 'app-feed',
  imports: [PostCardComponent, InfiniteScrollDirective, LoadingSpinnerComponent, PostSkeletonComponent, AddPostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  // inject services
  private readonly postService = inject(PostService);

  pagenumber = signal<number>(1);
  // posts
  allPosts = signal<Post[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getAllPosts();
  }
  // get all posts
  getAllPosts() {
    const userData = JSON.parse(localStorage.getItem(STORED_KEYS.userData) || "{}")
    console.log(userData);
    // console.log(STORED_KEYS.userData.name);
    console.log("get all");
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.postService.getAllPosts(this.pagenumber()).subscribe({

      next: (response: IAllPostsResponse) => {
        console.log(this.pagenumber());
        if (this.allPosts().length > 0) {
          console.log(this.allPosts().length);
          console.log("append");
          this.allPosts.set([...this.allPosts(), ...response.data.posts]);
        } else {
          console.log("set");
          this.allPosts.set(response.data.posts);
          console.log(this.allPosts().length);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
      }
    })
  }
  onScroll() {
    if (this.isLoading()) return;
    console.log("scroll");
    this.pagenumber.set(this.pagenumber() + 1);
    this.getAllPosts();
  }

  addPost(event: Post) {
    console.log("added");
    this.allPosts.set([event, ...this.allPosts()]);
    console.log(this.allPosts().length);
  }
}
