import { Component, Input, OnInit } from '@angular/core';
import { Producto } from "../../interfaces/producto";
import { CartUseCase } from "../../use-cases/cart-use-case.service";

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html'
})
export class CarritoItemComponent implements OnInit {

  @Input()
  producto: Producto = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      count: 0,
      rate: 0
    }
  }

  constructor(private carritoUseCase: CartUseCase) { }

  ngOnInit(): void { }

  remover() {
    this.carritoUseCase.update(this.producto)
  }
}
