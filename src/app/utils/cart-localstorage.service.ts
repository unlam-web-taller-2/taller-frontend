import { Injectable } from "@angular/core";
import {Producto} from "../interfaces/producto";

@Injectable({
  providedIn: 'root'
})
export class CartLocalstorage {
  private CART_KEY = "cart"

  saveCart(products: Producto[]) {
    const json = this.parseToJson(products)
    localStorage.setItem(this.CART_KEY, json)
  }

  getCart(): Producto[] {
    const json = localStorage.getItem(this.CART_KEY)
    const items = this.parseFromJson(json)

    return items == null ? [] : items
  }

  private parseToJson(products: Producto[]): string {
    return JSON.stringify(products)
  }

  private parseFromJson(json: string | null): Producto[] {
    return json === null ? [] : JSON.parse(json)
  }
}
