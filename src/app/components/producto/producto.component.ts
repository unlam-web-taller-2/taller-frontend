import {Component, Input, OnInit} from '@angular/core';
import { Producto } from '../../interfaces/producto';
import {CarritoUseCase} from "../../use-cases/carrito-use-case";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

  @Input()
  producto: Producto = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: ""
  }

  agregadoAlCarrito: Boolean = false

  constructor(private carritoUseCase: CarritoUseCase) { }

  ngOnInit(): void {
    this.carritoUseCase.carritoEmitter
      .asObservable()
      .subscribe(
        _ => this.agregadoAlCarrito = this.carritoUseCase.agregado(this.producto)
      )
  }

  agregarProducto(producto: Producto): void{
    this.carritoUseCase.actualizar(producto)
  }
}
