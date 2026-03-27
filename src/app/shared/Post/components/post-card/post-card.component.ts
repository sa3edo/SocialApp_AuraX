import { Component, computed, inject, input, output } from '@angular/core';
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

  isLiked = computed(() => this.post()?.likes?.includes(this.userId));

  openModal(id: string) {
    console.log("openn");
    this.modalService.handleShowDialog(id);
  }

  handleLike(id: string) {
    console.log(this.userId);
    console.log("likeeee");
    this.postService.toggleLikePost(id).subscribe({
      next: (response: ILikeResponse) => {
        this.postService.likePost.set(response.data.likesCount);
        this.postService.likedId.set(id);

      }
    })
  }

}
