import { Component } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  constructor(private apiService: ApiService, private router: Router) { }


  signIn() {
    this.router.navigate(['/home'])
  }
}
