import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly _HttpClient=inject(HttpClient)

  constructor() { }

   addInvoice(data:object):Observable<any>{
      return this._HttpClient.post('https://localhost:7110/api/Invoices',data);
    }

    getInvoiceById(id:string):Observable<any>{
      return this._HttpClient.get(`https://localhost:7110/api/Invoices/${id}`);
    }
  
    getAllInvoices():Observable<any>{
      return this._HttpClient.get('https://localhost:7110/api/Invoices');
    }

    changeStatus(id:string,status :string):Observable<any>{
      return this._HttpClient.put(`https://localhost:7110/api/Invoices/${id}/toggleStatus`,
        {
          status:status
        }
      );
    }
}
