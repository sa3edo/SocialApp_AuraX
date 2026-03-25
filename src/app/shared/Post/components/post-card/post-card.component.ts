import { Component, input } from '@angular/core';
import { Post } from '../../interface/IAllPostsResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  post = input<Post>();
}
