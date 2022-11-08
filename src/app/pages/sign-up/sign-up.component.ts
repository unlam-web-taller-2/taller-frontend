import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  signUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  isLoading: boolean = false;

  constructor(private router: Router, private apiService: ApiService) { }

  signUp() {
    const email = this.signUpFormGroup.get('email')?.value;
    const password = this.signUpFormGroup.get('password')?.value;
    const name = this.signUpFormGroup.get('name')?.value;
    const lastname = this.signUpFormGroup.get('lastname')?.value;
    const address = this.signUpFormGroup.get('address')?.value;

    this.showButtonLoading(true);
    this.apiService.signUp(
      email ? email : '',
      password ? password : '',
      name ? name : '',
      lastname ? lastname : '',
      address ? address : ''
    ).subscribe({
      next: resp => this.signUpSuccess(resp),
      error: err => this.signUpError(err),
      complete: () => this.signUpComplete()
    });
  }

  private signUpSuccess(response: any) {
    this.router.navigate(['/sign-in']);
  }

  private signUpError(error: any) {
    console.log(error.message);
  }

  private signUpComplete() {
    this.showButtonLoading(false);
  }

  private showButtonLoading(show: boolean) {
    this.isLoading = show;
  }
}
