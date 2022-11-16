import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../../interfaces/product";
import { CartUseCase } from "../../use-cases/cart-use-case";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnInit {

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

  constructor(private cartUseCase: CartUseCase) { }

  ngOnInit(): void { }

  remover() {
    this.cartUseCase.addRemove(this.product)
  }
}
