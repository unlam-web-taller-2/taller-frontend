import { Component } from '@angular/core';
import { CartUseCase } from "../../use-cases/cart-use-case";
import { Product } from "../../interfaces/product";
import { Router } from "@angular/router";
import {UserLocalstorage} from "../../utils/user-localstorage";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  cart: Product[] = []
  user: User | null

  constructor(private cartUseCase: CartUseCase, private router: Router, private userStorage: UserLocalstorage) {
    this.obsCartEmitter()
    this.cartUseCase.getCart()

    this.user = this.userStorage.getUser()
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

  logout() {
    this.userStorage.clear()
    this.router.navigate(['/sign-in'])
  }
}
