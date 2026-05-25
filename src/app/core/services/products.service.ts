import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private readonly _HttpClient=inject(HttpClient)
  constructor() { }


  addProduct(data:object):Observable<any>{
    return this._HttpClient.post('https://localhost:7110/api/Products',data);
  }

  getAllProducts():Observable<any>{
    return this._HttpClient.get('https://localhost:7110/api/Products');
  }

  getProductById(id:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7110/api/Products/${id}`);
  }


  updateProduct(id:string,data:object):Observable<any>{
    return this._HttpClient.put(`https://localhost:7110/api/Products/${id}`,data);
  }

  deleteProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`https://localhost:7110/api/Products/${id}`);
  }

  searchProduct(name:string):Observable<any>{
return this._HttpClient.get(`https://localhost:7110/api/Products/search?name=${name}`)
  }
}
