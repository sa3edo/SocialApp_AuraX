import { Component, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalService } from '../../../../core/services/modal.service';
import { PostService } from '../../services/post.service';
import { IGetLikesResponse, Like } from '../../interface/IGetLikesResponse';
import { LoadingSpinnerComponent } from "../../../Components/loading-spinner/loading-spinner.component";
import { ListSkeletonComponent } from "../../../Components/list-skeleton/list-skeleton.component";
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-post-likes',
  imports: [ButtonModule, DialogModule, LoadingSpinnerComponent, ListSkeletonComponent],
  templateUrl: './post-likes.component.html',
  styleUrl: './post-likes.component.css',
})
export class PostLikesComponent {

  // inject services
  readonly modalService = inject(ModalService);
  private readonly postService = inject(PostService);
  readonly userService = inject(UserService);

  listen = effect(() => {
    if (this.modalService.showDialog()) {
      console.log("effect show");
      untracked(() => {
        console.log(this.userService.following());
        this.getLikes(this.modalService.postId()!);
      })
    } else {
      untracked(() => {
        this.likes.set([]);
      })
    }
  })

  // signals
  likes = signal<Like[]>([]);
  totalLikesCount = signal<number>(0);
  isLoading = signal<boolean>(false);



  getLikes(id: string) {
    this.isLoading.set(true);
    this.postService.getPostLikes(id).subscribe({
      next: (response: IGetLikesResponse) => {
        console.log(response);
        this.likes.set(response.data.likes);
        this.totalLikesCount.set(response.meta.pagination.total);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
      }
    })
  }


}
