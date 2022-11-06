import { Component, OnInit } from '@angular/core';
import { Product } from "../../interfaces/product";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  productos: Product[] = []

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(response => this.productos = response);
  }
}
