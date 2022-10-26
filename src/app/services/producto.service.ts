import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos : producto[] = [];

  constructor(protected httpClient: HttpClient) { 
    
   }

  getProductos(): Observable<producto[]>{

    return this.httpClient.get<any[]>('https://fakestoreapi.com/products').pipe(share());
    
  }
}
