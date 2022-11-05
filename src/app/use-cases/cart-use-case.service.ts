import { EventEmitter, Injectable } from "@angular/core";
import { Producto } from "../interfaces/producto";
import { CartLocalstorage } from "../utils/cart-localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class CartUseCase {
  cart: Producto[] = []

  cartEmitter: EventEmitter<Producto[]> = new EventEmitter<Producto[]>()

  constructor(private localStorage: CartLocalstorage) {
    this.cart = localStorage.getCart()
    this.cartEmitter.emit(this.cart)
  }

  update(product: Producto) {
    if (!this.isAdded(product)) {
      this.add(product)
    } else {
      this.remove(product)
    }

    this.localStorage.saveCart(this.cart)
    this.cartEmitter.emit(this.cart)
  }

  isAdded(product: Producto): Boolean {
    return this.cart.some(prod => prod.id === product.id)
  }

  private add(product: Producto) {
    if (!this.cart.some(prod => prod.id === product.id)) {
      this.cart.push(product)
    }
  }

  private remove(product: Producto) {
    const pos = this.cart.findIndex(prod => prod.id === product.id)
    if (pos > -1) {
      this.cart.splice(pos, 1)
    }
  }
}
