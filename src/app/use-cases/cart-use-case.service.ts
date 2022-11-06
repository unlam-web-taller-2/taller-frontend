import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "../interfaces/product";
import { CartLocalstorage } from "../utils/cart-localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class CartUseCase {
  cart: Product[] = []

  cartEmitter: EventEmitter<Product[]> = new EventEmitter<Product[]>()

  constructor(private localStorage: CartLocalstorage) {
    this.cart = localStorage.getCart()
    this.cartEmitter.emit(this.cart)
  }

  update(product: Product) {
    if (!this.isAdded(product)) {
      this.add(product)
    } else {
      this.remove(product)
    }

    this.localStorage.saveCart(this.cart)
    this.cartEmitter.emit(this.cart)
  }

  isAdded(product: Product): Boolean {
    return this.cart.some(prod => prod.id === product.id)
  }

  private add(product: Product) {
    if (!this.cart.some(prod => prod.id === product.id)) {
      this.cart.push(product)
    }
  }

  private remove(product: Product) {
    const pos = this.cart.findIndex(prod => prod.id === product.id)
    if (pos > -1) {
      this.cart.splice(pos, 1)
    }
  }
}
