import { ToastService } from './../toast/toast.service';
import { Component, EventEmitter, inject, output, signal, OnInit } from '@angular/core';
import { PostService } from '../../Post/services/post.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICreatePostResponse, Post } from '../../Post/interface/ICreatePostResponse';
import { ToastComponent } from "../toast/toast.component";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { STORED_KEYS } from '../../../core/constants/storedKeys';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule, ToastComponent, LoadingSpinnerComponent],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent implements OnInit {

  // Get user data from local storage
  userData = JSON.parse(localStorage.getItem(STORED_KEYS.userData) || "{}")

  ngOnInit(): void {
    console.log(this.isLoading());
    console.log(this.postForm.invalid);
  }
  // Inject services
  private readonly postService = inject(PostService);
  private readonly toastService = inject(ToastService);

  // Signals
  isLoading = signal<boolean>(false)
  mediaPreview = signal<string | ArrayBuffer | null>(null)
  createdPost = output<any>()
  // Post form
  postForm = new FormGroup({
    body: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  createPost() {

    this.isLoading.set(true)
    const formData = new FormData();
    this.appendValues(formData)
    this.postService.createPost(formData).subscribe({
      next: (response: ICreatePostResponse) => {
        this.handleAfterCreatePost(response.message, response.data.post)
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  appendValues(formData: FormData) {
    if (this.postForm.value.body) {
      formData.append('body', this.postForm.value.body || '');
    }
    if (this.postForm.value.image) {
      formData.append('image', this.postForm.value.image || '');
    }
    return formData;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.mediaPreview.set(reader.result)
      }
      this.postForm.get('image')?.setValue(file)
    }
  }
  // handleAfterCreatePost(message: string, post: Post) {
  //   this.isLoading.set(false)
  //   this.postForm.reset();
  //   this.createdPost.emit({ ...post, user: this.userData })
  //   this.toastService.showSuccess(message)
  //   this.mediaPreview.set(null)
  // }

  handleAfterCreatePost(message: string, post: Post) {
    this.isLoading.set(false);
    this.postForm.reset();
    this.mediaPreview.set(null);

    // 1. Create the new post object
    const newPost = { ...post, user: this.userData };

    // 2. Update the signal (this will automatically update the UI)
    this.postService.addedPost.set(newPost);

    // 3. Show toast
    this.toastService.showSuccess(message);
  }
}
