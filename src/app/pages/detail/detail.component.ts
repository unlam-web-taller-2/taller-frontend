import { Component } from '@angular/core';
import { Product } from "../../interfaces/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  productId: number = -1

  product: Product = {
    id: 0,
    title: "",
    price: 1,
    description: '',
    category: '',
    image: '',
    rate: 1
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productId = params['id']
    })

    console.log(this.productId);
  }
}
