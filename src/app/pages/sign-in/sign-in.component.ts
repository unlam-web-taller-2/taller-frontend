import { Component } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../interfaces/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  signInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  signIn() {
    console.log(this.signInFormGroup.value)
    const email = this.signInFormGroup.get('email')?.value
    const password = this.signInFormGroup.get('password')?.value
    this.showButtonLoading(true);
    this.apiService.signIn(email ? email : '', password ? password : '')
      .subscribe({
        next: res => this.signInSuccess(res),
        error: err => this.signInError(err),
        complete: () => this.signInComplete()
      })
  }

  private showButtonLoading(show: boolean) {
    this.isLoading = show;
  }

  private signInComplete() {
    this.showButtonLoading(false);
  }

  private signInSuccess(response: User) {
    this.router.navigate(['/home']);
  }

  private signInError(error: any) {
    console.log(error.messages)
  }
}
