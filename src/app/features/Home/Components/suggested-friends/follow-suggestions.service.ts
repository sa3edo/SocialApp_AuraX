import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFollowSugResponse } from '../../../../core/interfaces/IFollowSugResponse';
import { appAPIs } from '../../../../core/constants/appAPIs';

@Injectable({
  providedIn: 'root',
})
export class FollowSuggestionsService {
  private readonly http = inject(HttpClient);

  getFollowSuggestions() {
    return this.http.get<IFollowSugResponse>(appAPIs.followSuggestions);
  }
}
