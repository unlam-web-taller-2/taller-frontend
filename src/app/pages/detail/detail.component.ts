import { Component } from '@angular/core';
import { Product } from "../../interfaces/product";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { ToastUseCase } from "../../use-cases/toast-use-case";
import { ToastFactory } from "../../utils/toast-factory";
import { Toast } from "../../interfaces/toast";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  PRODUCT_INVALID = -1

  productId: number = this.PRODUCT_INVALID

  product: Product = {
    id: 0,
    title: "",
    price: 1,
    description: '',
    category: '',
    image: '',
    rate: 1
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toastUseCase: ToastUseCase
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productId = params['id']
    })

    if(this.productId != this.PRODUCT_INVALID) {
      this.getProduct(this.productId)
    } else {
      this.showToast(ToastFactory.getError("Algo salió mal"))
    }
  }

  private getProduct(id: number) {
    this.apiService.getProduct(id)
      .subscribe({
        next: res => this.product = res.data,
        error: err => this.showToast(ToastFactory.getError(err.error.message()))
      })
  }

  private showToast(toast: Toast) {
    this.toastUseCase.show(toast)
  }
}
