import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/Components/toast/toast.service';
import { IRegisterResponse } from '../../interface/IRegisterResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  // Inject services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  // Signals
  public isLoading = signal<boolean>(false);
  // Form
  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', Validators.required],
    rePassword: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
  });

  // Submit
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    const userData = this.signupForm.value;
    this.authService.register(userData).subscribe({
      next: (response: IRegisterResponse) => {
        this.handleSuccess(response.message);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.handleError(error.error.message);
        console.log(error.error.message);
      }
    });
  }

  handleSuccess(message: string) {
    this.isLoading.set(false);
    this.toastService.showSuccess(message);
    this.navigateToLogin();
  }

  handleError(message: string) {
    this.toastService.showError(message);
  }
  navigateToLogin() {
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 2000);
  }
}
