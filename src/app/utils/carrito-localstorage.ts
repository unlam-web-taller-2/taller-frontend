import { Injectable } from "@angular/core";
import {Producto} from "../interfaces/producto";

@Injectable({
  providedIn: 'root'
})
export class CarritoLocalstorage {
  private CARRITO_KEY = "carrito"

  saveCarrito(productos: Producto[]) {
    const json = this.parseToJson(productos)
    localStorage.setItem(this.CARRITO_KEY, json)
  }

  getCarrito(): Producto[] {
    const json = localStorage.getItem(this.CARRITO_KEY)
    const items = this.parseFromJson(json)

    return items == null ? [] : items
  }

  private parseToJson(productos: Producto[]): string {
    return JSON.stringify(productos)
  }

  private parseFromJson(json: string | null): Producto[] {
    return json === null ? [] : JSON.parse(json)
  }
}
