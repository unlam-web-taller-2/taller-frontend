import { Component } from '@angular/core';
import { CartUseCase } from "../../use-cases/cart-use-case.service";
import { Product } from "../../interfaces/product";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  cart: Product[] = []

  constructor(private cartUseCase: CartUseCase, private router: Router) {
    this.cart = cartUseCase.cart
    this.cartUseCase.cartEmitter
      .asObservable()
      .subscribe(cart => {
        console.log(cart)
        this.cart = cart
      })
  }

  goToCartPage() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/cart']);
  }
}
