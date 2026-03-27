import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IAllPostsResponse } from '../interface/IAllPostsResponse';
import { appAPIs } from '../../../core/constants/appAPIs';
import { ICreatePostResponse, Post } from '../interface/ICreatePostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);

  addedPost = signal<any>(null);
  getAllPosts(pagenumber: number = 1) {
    return this.http.get<IAllPostsResponse>(`${appAPIs.getAllPosts}?limit=10&page=${pagenumber}`);
  }

  createPost(data: FormData) {
    return this.http.post<ICreatePostResponse>(appAPIs.createPost, data);
  }
}
