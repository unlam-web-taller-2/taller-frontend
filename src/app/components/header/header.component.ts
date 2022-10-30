import { Component, OnInit } from '@angular/core';
import {CarritoUseCase} from "../../use-cases/carrito-use-case";
import {Producto} from "../../interfaces/producto";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  carrito: Producto[] = []

  constructor(private carritoUseCase: CarritoUseCase) { }

  ngOnInit(): void {
    this.carritoUseCase.carritoEmitter
      .asObservable()
      .subscribe(cart => this.carrito = cart)
  }

}
