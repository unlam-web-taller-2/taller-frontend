import { Component, OnInit } from '@angular/core';
import { CartUseCase } from "../../use-cases/cart-use-case.service";
import { Product } from "../../interfaces/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Product[] = []
  total: number = 0

  constructor(private catUseCase: CartUseCase) { }

  ngOnInit(): void {
    this.cart = this.catUseCase.cart
    this.updateTotal()
    this.catUseCase.cartEmitter
      .asObservable()
      .subscribe(
        prods => {
          this.cart = prods
          this.updateTotal()
        }
      )
  }

  private updateTotal() {
    this.total = 0
    this.cart.forEach(cart => {
      this.total += cart.price
    })
  }
}
