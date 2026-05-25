import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly _HttpClient=inject(HttpClient)
  constructor() { }

  addCustomer(data:object):Observable<any>{
    return this._HttpClient.post('https://localhost:7110/api/Customers',data);
  }

  getAllCustomers():Observable<any>{
    return this._HttpClient.get('https://localhost:7110/api/Customers');
  }

  getCustomerById(id:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7110/api/Customers/${id}`);
  }

  updateCustomer(id:string,data:object):Observable<any>{
    return this._HttpClient.put(`https://localhost:7110/api/Customers/${id}`,data);
  }

  deleteCustomer(id:string):Observable<any>{
    return this._HttpClient.delete(`https://localhost:7110/api/Customers/${id}`);
  }

    searchByNationalId(nationalId:string|''):Observable<any>{
return this._HttpClient.get(`https://localhost:7110/api/Customers/search?nationalId=${nationalId}`)
  }
}
