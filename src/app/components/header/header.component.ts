import { Component } from '@angular/core';
import { CartUseCase } from "../../use-cases/cart-use-case.service";
import { Product } from "../../interfaces/product";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  carrito: Product[] = []

  constructor(private carritoUseCase: CartUseCase, private router: Router) {
    this.carrito = carritoUseCase.cart
    this.carritoUseCase.cartEmitter
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
