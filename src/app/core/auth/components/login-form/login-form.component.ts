import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ILoginResponse } from '../../interface/ILoginResponse';
import { STORED_KEYS } from '../../../constants/storedKeys';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  // inject services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Signals
  public isLoading = signal<boolean>(false);
  // Form
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Submit
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    const userData = this.loginForm.value;
    this.authService.login(userData).subscribe({
      next: (response: ILoginResponse) => {
        console.log(response);
        this.afterSubmitSuccess(response)
      },
      error: (error) => {
        console.log(error);
        this.afterSubmitError()
      }
    });
  }


  afterSubmitSuccess(response: ILoginResponse) {
    console.log(response.data.user);
    localStorage.setItem(STORED_KEYS.token, response.data.token);
    localStorage.setItem(STORED_KEYS.userData, JSON.stringify(response.data.user));
    // Object.entries(STORED_KEYS.userData).forEach(([key, storageKey]) => {

    //   localStorage.setItem());
    // });
    localStorage.setItem(STORED_KEYS.userData, JSON.stringify(response.data.user));
    this.isLoading.set(false);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  afterSubmitError() {
    this.isLoading.set(false);
  }
}
