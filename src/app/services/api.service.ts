import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL_BASE = "http://localhost:3000"

  constructor(protected httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.URL_BASE}/products`);
  }

  signIn(email: string, password: string): Observable<User> {
    const sign = {
      email: email,
      password: password
    }

    return this.httpClient.post<User>(`${this.URL_BASE}/sign-in`, sign)
  }

  signUp(email: string, password: string, name: string, lastname: string, address: string): Observable<any> {
    const sign = {
      email: email,
      password: password,
      name: name,
      lastname: lastname,
      address: address
    }

    return this.httpClient.post(`${this.URL_BASE}/sign-up`, sign);
  }
}
