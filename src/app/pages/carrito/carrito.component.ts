import { Component, OnInit } from '@angular/core';
import { CartUseCase } from "../../use-cases/cart-use-case.service";
import { Producto } from "../../interfaces/producto";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {

  carrito: Producto[] = []
  total: number = 0

  constructor(private carritoUseCase: CartUseCase) { }

  ngOnInit(): void {
    this.carrito = this.carritoUseCase.cart
    this.updateCarrito()
    this.carritoUseCase.cartEmitter
      .asObservable()
      .subscribe(
        prods => {
          this.carrito = prods
          this.updateCarrito()
        }
      )
  }

  private updateCarrito() {
    this.total = 0
    this.carrito.forEach(cart => {
      this.total += cart.price
    })
  }
}
