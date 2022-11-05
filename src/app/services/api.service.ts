import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL_BASE = "http://localhost:3000"

  constructor(protected httpClient: HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.URL_BASE}/products`);
  }
}
