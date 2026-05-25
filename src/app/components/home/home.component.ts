import { Component, inject, OnInit } from '@angular/core';
import { ResultService } from '../../core/services/result.service';
import { IAnalysis } from '../../core/interfaces/ianalysis';
import { CurrencyPipe, NgStyle, NgClass } from '@angular/common';
import { ICustomer } from '../../core/interfaces/icustomer';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { IProduct } from '../../core/interfaces/iproduct';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, NgStyle, NgClass, HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    private readonly _ResultService=inject(ResultService)
        result:IAnalysis ={} as IAnalysis;
        customers:ICustomer[]=[];
        products:IProduct[]=[];
    

  ngOnInit(): void {

    this._ResultService.getAnalysisResult().subscribe({
      next:(response)=>{
        console.log(response);
        this.result=response;

      }
    })


    this._ResultService.getBest10Customers().subscribe({
      next:(response)=>{
        console.log(response);
        this.customers=response;
      }
    })

     
    this._ResultService.getBest10Products().subscribe({
      next:(response)=>{
        console.log(response);
        this.products=response;
      }
    })
  }



}
