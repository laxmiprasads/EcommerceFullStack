import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
    
  private apiUrl='http://localhost:3000/products';
  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  // increaseStock(id:number): Observable<any>{
  //   return this.http.put<void>(`${this.apiUrl}/${id}.stock`)
  // }
}