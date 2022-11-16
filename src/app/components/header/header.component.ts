import { Component } from '@angular/core';
import { CartUseCase } from "../../use-cases/cart-use-case";
import { Product } from "../../interfaces/product";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  cart: Product[] = []

  constructor(private cartUseCase: CartUseCase, private router: Router) {
    this.obsCartEmitter()
    this.cartUseCase.getCart()
  }

  goToCartPage() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/cart']);
  }

  private obsCartEmitter() {
    this.cartUseCase.cartEmitter
      .asObservable()
      .subscribe(cart => {
        console.log(cart)
        this.cart = cart
      })
  }
}
