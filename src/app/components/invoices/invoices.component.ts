import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../core/services/invoice.service';
import { IInvoice } from '../../core/interfaces/iinvoice';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [HeaderComponent,FormsModule,RouterLink,NgClass],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {
private readonly _InvoiceService=inject(InvoiceService)
invoices:IInvoice[]=[];
  text:string="";

  ngOnInit(): void {
    this._InvoiceService.getAllInvoices().subscribe({
      next:(res)=>{
        console.log(res);
        this.invoices=res
        
      },
        error:(err)=> {
          console.log(err);
        }
    })
  }

  changeStatus(id:string,currentStatus:string,index:number){
    if(currentStatus==="مدفوع"){
      this._InvoiceService.changeStatus(id,"غير مدفوع").subscribe({
        next:(res)=>{
          console.log(res);
          //update status in invoices list
          this.invoices[index].status="غير مدفوع";
        
        }
      })
    }else{
      this._InvoiceService.changeStatus(id,"مدفوع").subscribe({
        next:(res)=>{
          console.log(res);
          //update status in invoices list
          this.invoices[index].status="مدفوع";
        }
      })
    }
        }
  }
