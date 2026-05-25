import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private readonly _HttpClient=inject(HttpClient)

  constructor() { }

   getAnalysisResult():Observable<any>{
      return this._HttpClient.get('https://localhost:7110/api/Analysiss');
    }

    getBest10Customers():Observable<any>{
      return this._HttpClient.get('https://localhost:7110/api/Analysiss/best10Customers');
    }

       getBest10Products():Observable<any>{
      return this._HttpClient.get('https://localhost:7110/api/Analysiss/best10Products');
    }
}
