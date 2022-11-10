import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartUseCase } from "../../use-cases/cart-use-case.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rate: 0
  }

  isAddedToCart: Boolean = false

  constructor(private cartUseCase: CartUseCase) { }

  ngOnInit(): void {
    this.isAddedToCart = this.cartUseCase.isAdded(this.product)
    this.cartUseCase.cartEmitter
      .asObservable()
      .subscribe(
        _ => {
          this.isAddedToCart = this.cartUseCase.isAdded(this.product)
          console.log(`producto: agregado al carrito => ${this.isAddedToCart}`)
        }
      )
  }

  addToCart(product: Product): void{
    this.cartUseCase.update(product)
  }
}
