import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { ApiResponse } from "../../services/responses/ApiResponse";
import { ToastUseCase } from "../../use-cases/toast-use-case";
import { ToastFactory } from "../../utils/toast-factory";
import { FormsValidators } from "../../utils/forms-validators";
import {finalize} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  signUpFormGroup = new FormGroup({
    email: new FormControl('', [ Validators.email, Validators.required ]),
    password: new FormControl('', [ Validators.required, FormsValidators.validatePassword ]),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  isLoading: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private toastUseCase: ToastUseCase) { }

  signUp() {
    const email = this.signUpFormGroup.get('email')?.value;
    const password = this.signUpFormGroup.get('password')?.value;
    const name = this.signUpFormGroup.get('name')?.value;
    const lastname = this.signUpFormGroup.get('lastname')?.value;
    const address = this.signUpFormGroup.get('address')?.value;

    this.showButtonLoading(true);
    this.apiService.register(
      email ? email : '',
      password ? password : '',
      name ? name : '',
      lastname ? lastname : '',
      address ? address : ''
    )
      .pipe(finalize(() => this.signUpComplete()))
      .subscribe({
      next: resp => this.signUpSuccess(resp),
      error: err => this.signUpError(err)
    });
  }

  private signUpSuccess(response: ApiResponse<any>) {
    this.router.navigate(['/sign-in']);
    this.toastUseCase.show(ToastFactory.getSuccess(response.message))
  }

  private signUpError(error: any) {
    this.toastUseCase.show(ToastFactory.getError(error.message))
  }

  private signUpComplete() {
    this.showButtonLoading(false);
  }

  private showButtonLoading(show: boolean) {
    this.isLoading = show;
  }
}
