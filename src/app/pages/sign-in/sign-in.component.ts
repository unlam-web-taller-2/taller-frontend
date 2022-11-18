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
import { ApiResponse } from "../../services/responses/ApiResponse";
import { FormsValidators } from "../../utils/forms-validators";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

  signInFormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, FormsValidators.validatePassword ])
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
    this.apiService.login(email ? email : '', password ? password : '')
      .pipe(finalize(() => this.signInComplete()))
      .subscribe({
        next: res => this.signInSuccess(res),
        error: err => this.signInError(email ? email : '', err.error)
      });
  }

  private showButtonLoading(show: boolean) {
    this.isLoading = show;
  }

  private signInComplete() {
    this.showButtonLoading(false);
  }

  private signInSuccess(response: ApiResponse<User>) {
    this.userLocalStorage.saveUser(response.data);
    this.router.navigate(['/home']);
    this.toastUseCase.show(ToastFactory.getSuccess(response.message))
  }

  private signInError(email: string, error: any) {
    switch (error.code) {
      case 'UserNotConfirmedException': {
        this.router.navigate(['/verify'], { queryParams: { email: email }})
        break
      }
    }
    this.toastUseCase.show(ToastFactory.getError(error.message))
  }
}
