import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "../interfaces/product";
import { ApiService } from "../services/api.service";
import { ToastUseCase } from "./toast-use-case";
import { UserLocalstorage } from "../utils/user-localstorage";
import { User, USER_DEFAULT } from "../interfaces/user";
import { ToastFactory } from "../utils/toast-factory";
import { Toast } from "../interfaces/toast";
import { ApiResponse } from "../services/responses/ApiResponse";
import { Observer } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartUseCase {
  user: User = USER_DEFAULT
  cart: Product[] = []
  cartEmitter: EventEmitter<Product[]> = new EventEmitter<Product[]>()
  private handlerObs: Partial<Observer<ApiResponse<Product[]>>> = {
    next: res => {
      this.cart = res.data
      this.cartEmitter.emit(this.cart)
    },
    error: err => this.showToast(ToastFactory.getError(err.error.message))
  }

  constructor(private apiService: ApiService, private toastUseCase: ToastUseCase, private userLocalstorage: UserLocalstorage) {
    this.user = userLocalstorage.getUser() ? userLocalstorage.getUser() as User : USER_DEFAULT
  }

  addRemove(product: Product) {
    if (this.isAdded(product)) {
      this.remove(product)
    } else {
      this.add(product)
    }
  }

  isAdded(product: Product): Boolean {
    return this.cart.some(prod => prod.id === product.id)
  }

  getCart() {
    this.apiService.getCart(this.user.id)
      .subscribe(this.handlerObs)
  }

  private add(product: Product) {
    this.apiService.addCart(this.user.id, product.id)
      .subscribe(this.handlerObs)
  }

  private remove(product: Product) {
    this.apiService.removeCart(this.user.id, product.id)
      .subscribe(this.handlerObs)
  }

  private showToast(toast: Toast) {
    this.toastUseCase.show(toast)
  }
}
