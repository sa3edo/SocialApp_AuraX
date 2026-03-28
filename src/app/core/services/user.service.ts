import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IFollowSugResponse } from '../interfaces/IFollowSugResponse';
import { appAPIs } from '../constants/appAPIs';
import { IGetMyProfile, User } from '../interfaces/IGetMyProfile';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  followers = signal<any[]>([]);
  following = signal<any[]>([]);
  suggestions = signal<any[]>([]);
  bookmarks = signal<any[]>([]);

  getFollowSuggestions() {
    return this.http.get<IFollowSugResponse>(appAPIs.followSuggestions);
  }

  getMyProfile() {
    return this.http.get<IGetMyProfile>(appAPIs.getMyProfile).pipe(
      tap((response) => {
        this.currentUser.set(response.data.user);
        this.followers.set(response.data.user.followers);
        this.following.set(response.data.user.following);
        this.bookmarks.set(response.data.user.bookmarks);
      })
    );
  }
}
