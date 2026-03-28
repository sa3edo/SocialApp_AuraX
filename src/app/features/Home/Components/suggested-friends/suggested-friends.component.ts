import { Component, inject, OnInit, signal } from '@angular/core';
import { IFollowSugResponse, Suggestion } from '../../../../core/interfaces/IFollowSugResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { FollowSuggestionsService } from './follow-suggestions.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-suggested-friends',
  imports: [],
  templateUrl: './suggested-friends.component.html',
  styleUrl: './suggested-friends.component.css',
})
export class SuggestedFriendsComponent implements OnInit {

  // Inject Services
  private readonly followSuggestionsService = inject(FollowSuggestionsService);
  private readonly userService = inject(UserService);
  // Signals
  public suggestions = signal<Suggestion[]>([]);

  bordersColors = [
    'border-main-500',
    'border-secondary-500',
    'border-tertiary-500',
  ]


  ngOnInit(): void {
    this.getSuggestions();
  }

  getSuggestions() {
    this.followSuggestionsService.getFollowSuggestions().subscribe({
      next: (response: IFollowSugResponse) => {
        this.suggestions.set(response.data.suggestions);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
  
  getBorderColor(index: number): string {
    return this.bordersColors[index % this.bordersColors.length];
  }
}
