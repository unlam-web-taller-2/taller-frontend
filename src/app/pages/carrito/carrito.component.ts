import { Component, OnInit } from '@angular/core';
import {CarritoUseCase} from "../../use-cases/carrito-use-case";
import {Producto} from "../../interfaces/producto";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {

  carrito: Producto[] = []
  total: number = 0

  constructor(private carritoUseCase: CarritoUseCase) { }

  ngOnInit(): void {
    this.carrito = this.carritoUseCase.carrito
    this.updateCarrito()
    this.carritoUseCase.carritoEmitter
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
