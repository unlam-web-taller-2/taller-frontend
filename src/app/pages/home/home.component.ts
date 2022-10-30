import { Component, OnInit } from '@angular/core';
import {Producto} from "../../interfaces/producto";
import {ProductoService} from "../../services/producto.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  productos: Producto[] = []

  constructor(private service: ProductoService) { }

  ngOnInit(): void {
    this.service.getProductos().subscribe(response => this.productos = response);
  }
}
