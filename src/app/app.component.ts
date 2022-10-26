import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { producto } from './interfaces/producto';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'miAplicacion';
  carrito : producto[] = [
    {
      id: 100,
      title: 'Flauta',
      price: 20000.0,
      description:'description',
      category: 'Instrumento Viento',
      image:'imagen'
    }
  ]
  
  productos : producto[] = []
  
  constructor(private productoService: ProductoService, protected httpClient: HttpClient){

  }
  ngOnInit(): void {
    this.productoService.getProductos().subscribe(response => this.productos = response);
  }

  
  agregarProducto(producto: producto): void{
    this.carrito.push(producto);
  }
}
