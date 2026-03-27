import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalService } from '../../../../core/services/modal.service';
import { PostService } from '../../services/post.service';
import { IGetLikesResponse, Like } from '../../interface/IGetLikesResponse';

@Component({
  selector: 'app-post-likes',
  imports: [ButtonModule, DialogModule],
  templateUrl: './post-likes.component.html',
  styleUrl: './post-likes.component.css',
})
export class PostLikesComponent implements OnInit {

  // inject services
  readonly modalService = inject(ModalService);
  private readonly postService = inject(PostService);


  // signals
  likes = signal<Like[]>([]);
  totalLikesCount = signal<number>(0);
  ngOnInit(): void {

  }
  getLikes(id: string) {
    this.postService.getPostLikes(id).subscribe({
      next: (response: IGetLikesResponse) => {
        console.log(response);
        this.likes.set(response.data.likes);
        this.totalLikesCount.set(response.meta.pagination.total);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
