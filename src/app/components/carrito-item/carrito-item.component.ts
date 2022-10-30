import {Component, Input, OnInit} from '@angular/core';
import {Producto} from "../../interfaces/producto";
import {CarritoUseCase} from "../../use-cases/carrito-use-case";

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

  constructor(private carritoUseCase: CarritoUseCase) { }

  ngOnInit(): void { }

  remover() {
    this.carritoUseCase.actualizar(this.producto)
  }
}
