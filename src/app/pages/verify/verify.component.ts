import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { ToastUseCase } from "../../use-cases/toast-use-case";
import { ToastFactory } from "../../utils/toast-factory";
import { finalize } from "rxjs";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {
  email: string = ''
  verifyFormGroup = new FormGroup({
    code: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.required
      ]
    )
  })

  isLoading: boolean = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toastUseCase: ToastUseCase
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email']
    })
  }

  verify() {
    const email = this.email
    const code = this.verifyFormGroup.get('code')?.value

    this.isLoading = true
    this.apiService.verify(email ? email : '', code ? code : '')
      .pipe(finalize(() => { this.isLoading = false }))
      .subscribe({
        next: response => {
          this.toastUseCase.show(ToastFactory.getSuccess(response.message))
          this.router.navigate(['/sign-in'])
        },
        error: err => { this.toastUseCase.show(ToastFactory.getError(err.error.message)) }
      })
  }
}
