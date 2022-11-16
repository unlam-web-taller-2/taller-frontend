import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { User } from "../interfaces/user";
import { ApiResponse } from "./responses/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:3000"

  constructor(protected httpClient: HttpClient) { }

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.httpClient.get<ApiResponse<Product[]>>(`${this.BASE_URL}/products/`);
  }

  login(email: string, password: string): Observable<ApiResponse<User>> {
    const login = {
      email: email,
      password: password
    }

    return this.httpClient.post<ApiResponse<User>>(`${this.BASE_URL}/users/login`, login)
  }

  register(email: string, password: string, name: string, lastname: string, address: string): Observable<ApiResponse<any>> {
    const register = {
      email: email,
      password: password,
      name: name,
      lastname: lastname,
      address: address
    }

    return this.httpClient.post<ApiResponse<any>>(`${this.BASE_URL}/users/register`, register);
  }

  addCart(userId: number, productId: number): Observable<ApiResponse<Product[]>> {
    const request = {
      user_id: userId,
      product_id: productId
    }

    return this.httpClient.post<ApiResponse<Product[]>>(`${this.BASE_URL}/cart/add_cart`, request)
  }

  removeCart(userId: number, productId: number): Observable<ApiResponse<Product[]>> {
    return this.httpClient.delete<ApiResponse<Product[]>>(`${this.BASE_URL}/cart/delete_product_from_cart?user_id=${userId}&product_id=${productId}`)
  }

  getCart(userId: number): Observable<ApiResponse<Product[]>> {
    return this.httpClient.get<ApiResponse<Product[]>>(`${this.BASE_URL}/cart/get_user_cart?user_id=${userId}`)
  }
}
