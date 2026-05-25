import { Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from '../../core/services/invoice.service';
import { IInvoice } from '../../core/interfaces/iinvoice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-invoice',
  standalone: true,
  imports: [],
  templateUrl: './detail-invoice.component.html',
  styleUrl: './detail-invoice.component.scss'
})
export class DetailInvoiceComponent implements OnInit {
  private readonly _InvoiceService=inject(InvoiceService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  detailsInvoice:IInvoice={}as IInvoice;
  ngOnInit(): void {
  
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let productId=params.get('id');
        //call api to get data of product by id
   this._InvoiceService.getInvoiceById(productId!).subscribe({
          next:(response)=>{
            this.detailsInvoice=response;
            console.log(response);}
  })
}});

}
}
