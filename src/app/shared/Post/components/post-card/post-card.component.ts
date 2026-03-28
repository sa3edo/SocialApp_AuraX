import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { Post } from '../../interface/IAllPostsResponse';
import { DatePipe, I18nPluralPipe } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';
import { PostService } from '../../services/post.service';
import { ILikeResponse } from '../../interface/ILikeResponse';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe, I18nPluralPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent implements OnInit {
  post = input.required<Post>();


  // inject services
  private modalService = inject(ModalService);
  private postService = inject(PostService);

  // Local Signals
  isLiked = signal<boolean>(false);
  likesCount = signal<number>(0);
  commentsCount = signal<number>(0);
  sharesCount = signal<number>(0);

  // user data
  userData = JSON.parse(localStorage.getItem('userData') || "{}");
  userId = this.userData._id;

  ngOnInit(): void {
    this.isPostLiked();
  }
  openModal(id: string) {
    console.log("openn");
    this.modalService.handleShowDialog(id);
  }
  isPostLiked(): void {
    const currentPost = this.post();
    this.isLiked.set(currentPost.likes?.includes(this.userId) || false);
    this.likesCount.set(currentPost.likesCount || 0);
  };
  toggleLike() {

    const currentlyLiked = this.isLiked();

    this.isLiked.set(!currentlyLiked);
    this.likesCount.update(count => currentlyLiked ? count - 1 : count + 1);

    this.postService.toggleLikePost(this.post()._id).subscribe({
      next: (response: ILikeResponse) => {
      },
      error: (error) => {
        console.error('Error toggling like', error);

        this.isLiked.set(currentlyLiked);
        this.likesCount.update(count => currentlyLiked ? count + 1 : count - 1);
      }
    });
  }

}
