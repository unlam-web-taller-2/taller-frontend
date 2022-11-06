import { Injectable } from "@angular/core";
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class CartLocalstorage {
  private CART_KEY = "cart"

  saveCart(products: Product[]) {
    const json = this.parseToJson(products)
    localStorage.setItem(this.CART_KEY, json)
  }

  getCart(): Product[] {
    const json = localStorage.getItem(this.CART_KEY)
    const items = this.parseFromJson(json)

    return items == null ? [] : items
  }

  private parseToJson(products: Product[]): string {
    return JSON.stringify(products)
  }

  private parseFromJson(json: string | null): Product[] {
    return json === null ? [] : JSON.parse(json)
  }
}
