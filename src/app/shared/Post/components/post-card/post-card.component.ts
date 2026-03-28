import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
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
export class PostCardComponent {
  post = input<Post>();

  userData = JSON.parse(localStorage.getItem('userData') || "{}");
  userId = this.userData._id;

  // inject services
  private modalService = inject(ModalService);
  private postService = inject(PostService);

  // isLiked = computed(() => {
  //   const currentPost = this.post();
  //   if (!currentPost) return false;
  //   console.log("isLiked Computed");
  //   return currentPost.likes?.includes(this.userId);
  // });

  openModal(id: string) {
    console.log("openn");
    this.modalService.handleShowDialog(id);
  }

  toggleLike() {
    const currentPost = this.post();
    if (!currentPost) return;
    console.log(this.userId);
    console.log("likeeee");
    this.postService.toggleLikePost(currentPost._id).subscribe({
      next: (response: ILikeResponse) => {
        const isLikedFromAPI = response.data.liked
        if (isLikedFromAPI) {
          currentPost.likesCount++;
          currentPost.likes?.push(this.userId);
          currentPost.isLiked = true;

        }
        else {
          const index = currentPost.likes?.indexOf(this.userId);
          if (index !== -1) {
            currentPost.likes?.splice(index, 1);
            currentPost.likesCount--;
            currentPost.isLiked = false;
          }

        }

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
