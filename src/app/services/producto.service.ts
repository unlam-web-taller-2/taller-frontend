import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos : Producto[] = [];

  constructor(protected httpClient: HttpClient) {

   }

  getProductos(): Observable<Producto[]>{

    return this.httpClient.get<any[]>('https://fakestoreapi.com/products').pipe(share());

  }
}
