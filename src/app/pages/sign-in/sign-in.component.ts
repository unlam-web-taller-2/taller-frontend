import { Component } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../interfaces/user";
import { CartUseCase } from "../../use-cases/cart-use-case";
import { UserLocalstorage } from "../../utils/user-localstorage";
import { finalize } from "rxjs";
import { ToastUseCase } from "../../use-cases/toast-use-case";
import { ToastFactory } from "../../utils/toast-factory";

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

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cartUseCase: CartUseCase,
    private userLocalStorage: UserLocalstorage,
    private toastUseCase: ToastUseCase
  ) { }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  signIn() {
    const email = this.signInFormGroup.get('email')?.value
    const password = this.signInFormGroup.get('password')?.value
    this.showButtonLoading(true);
    this.apiService.signIn(email ? email : '', password ? password : '')
      .pipe(finalize(() => this.signInComplete()))
      .subscribe({
        next: res => this.signInSuccess(res),
        error: err => this.signInError(err.error)
      });
  }

  private showButtonLoading(show: boolean) {
    this.isLoading = show;
  }

  private signInComplete() {
    this.showButtonLoading(false);
  }

  private signInSuccess(response: User) {
    this.cartUseCase.clean();
    this.userLocalStorage.saveUser(response);
    this.router.navigate(['/home']);
  }

  private signInError(error: any) {
    this.toastUseCase.show(ToastFactory.getError(error.message))
  }
}
