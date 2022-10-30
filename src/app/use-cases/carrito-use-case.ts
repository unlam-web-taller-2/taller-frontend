import {EventEmitter, Injectable} from "@angular/core";
import {Producto} from "../interfaces/producto";
import {CarritoLocalstorage} from "../utils/carrito-localstorage";

@Injectable({
  providedIn: 'root'
})
export class CarritoUseCase {
  carrito: Producto[] = []

  carritoEmitter: EventEmitter<Producto[]> = new EventEmitter<Producto[]>()

  constructor(private localStorage: CarritoLocalstorage) {
    this.carrito = localStorage.getCarrito()
    //console.log(this.carrito)
    this.carritoEmitter.emit(this.carrito)
  }

  actualizar(producto: Producto) {
    if (!this.agregado(producto)) {
      this.agregar(producto)
    } else {
      this.remover(producto)
    }

    this.localStorage.saveCarrito(this.carrito)
    this.carritoEmitter.emit(this.carrito)
  }

  agregado(producto: Producto): Boolean {
    return this.carrito.some(prod => prod.id === producto.id)
  }

  private agregar(producto: Producto) {
    if (!this.carrito.some(prod => prod.id === producto.id)) {
      this.carrito.push(producto)
    }
  }

  private remover(producto: Producto) {
    const pos = this.carrito.findIndex(prod => prod.id === producto.id)
    if (pos > -1) {
      this.carrito.splice(pos, 1)
    }
  }
}
