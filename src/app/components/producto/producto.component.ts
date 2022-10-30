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
    image: "",
    rating: {
      count: 0,
      rate: 0
    }
  }

  agregadoAlCarrito: Boolean = false

  constructor(private carritoUseCase: CarritoUseCase) { }

  ngOnInit(): void {
    this.agregadoAlCarrito = this.carritoUseCase.agregado(this.producto)
    this.carritoUseCase.carritoEmitter
      .asObservable()
      .subscribe(
        _ => {
          this.agregadoAlCarrito = this.carritoUseCase.agregado(this.producto)
          console.log(`producto: agregado al carrito => ${this.agregadoAlCarrito}`)
        }
      )
  }

  agregarProducto(producto: Producto): void{
    this.carritoUseCase.actualizar(producto)
  }
}
