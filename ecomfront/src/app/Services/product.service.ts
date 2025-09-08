import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiUrl='https://localhost:7240/api/Product';
  constructor() { }

  http=inject(HttpClient)
  getAllProduct(){
    return this.http.get<Product[]>(this.apiUrl)
  }
  addProduct(data:any){
    return this.http.post(this.apiUrl,data)
  }
  updateProduct(product:Product){
    return this.http.put(`${this.apiUrl}/${product.id}`,product)
  }


  deleteProduct(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
