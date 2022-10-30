import { Component } from '@angular/core';
import {CarritoUseCase} from "../../use-cases/carrito-use-case";
import {Producto} from "../../interfaces/producto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  carrito: Producto[] = []

  constructor(private carritoUseCase: CarritoUseCase, private router: Router) {
    this.carrito = carritoUseCase.carrito
    this.carritoUseCase.carritoEmitter
      .asObservable()
      .subscribe(cart => {
        console.log(cart)
        this.carrito = cart
      })
  }

  irAlCarrito() {
    this.router.navigate(['/cart']);
  }
}
