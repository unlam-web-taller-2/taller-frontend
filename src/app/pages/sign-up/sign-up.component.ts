import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  constructor(private router: Router) { }

  signUp() {
    this.router.navigate(['/sign-in'])
  }
}
