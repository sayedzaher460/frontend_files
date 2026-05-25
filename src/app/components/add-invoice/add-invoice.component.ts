import { Item } from './../../core/interfaces/iinvoice';
import { InvoiceService } from './../../core/services/invoice.service';
import { Component, inject } from '@angular/core';
import {  FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProductSearch } from '../../core/interfaces/iproduct-search';
import { NgClass, NgIf, NgForOf, NgFor } from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { ICustomer } from '../../core/interfaces/icustomer';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass, NgIf,NgFor],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {
constructor(){
  this.AddItem()
}
  private readonly _FormBuilder=inject(FormBuilder)
    private readonly _Router=inject(Router)
    private readonly _InvoiceService=inject(InvoiceService)
    private readonly _ProductsService=inject(ProductsService)
    private readonly _CustomerService=inject(CustomerService)

    customerData:ICustomer={}as ICustomer
   // productDetail : IProductSearch[]=[]
   products:any[][]=[]
    textSearch:string=''
  Type:string="فرد";

selectType(type: string) {
  this.Type = type;
  if(type==='فرد')
  {
this.invoicePersonalForm.patchValue({ status: type })  }
  else if(type==='شركة')
  {
this.invoiceCompanyForm.patchValue({ type: type })  }
}



     invoicePersonalForm=this._FormBuilder.group({  
             status:["غير مدفوع",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
            customerId:[null],
             name: [{ value: '', disabled: true }],
            city: [{ value: '', disabled: true }],
           governate: [{ value: '', disabled: true }],
            items:this._FormBuilder.array([])
            });
             
            invoiceCompanyForm=this._FormBuilder.group({  
          name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
          type:["شركة",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
          city:[null,[Validators.minLength(3),Validators.maxLength(25)]],
          phone:[null,[Validators.minLength(3),Validators.maxLength(25),Validators.pattern('^[0-9]+$')]],
          governate:[null,[Validators.minLength(3),Validators.maxLength(25)]],
          taxNumber:[null,[Validators.required,Validators.pattern('^[0-9]+$')]],
        nationalId:[null],
         street:[null],
         items:this._FormBuilder.array([])
        });


        get currentForm() : any {
  return this.Type === 'فرد' ? this.invoicePersonalForm : this.invoiceCompanyForm;
}


      get items(): FormArray {
   return this.currentForm.get('items') as FormArray;
    }
  

            AddItem(){
              const fg=this._FormBuilder.group({
                 productId:[ null, Validators.required],
                quantity:[1,[Validators.required,Validators.min(1)]],
                unitPrice:[0,[Validators.required,Validators.min(1)]],
                discount:[0,[Validators.required,Validators.min(0),Validators.max(100)]],
                taxPercentage:[14,[Validators.required,Validators.min(0),Validators.max(100)]]
              })

              this.items.push(fg)
            }

       

         searchProduct(text:string , index:number) {
          if(text.length>0){
         this._ProductsService.searchProduct(text) .subscribe({
           next:(res)=>{
            console.log(res)
            console.log(text)
            this.products[index]=res

           // this.productDetail.find(x=>x.id)
          }
         })}
         else{
          this.products[index]=[]
         };
                  }


                  selectProduct(product: any, index: number) {
                      //const row = this.items.at(index);
                  const row = (this.invoicePersonalForm.get('items') as FormArray).at(index);

                     row.patchValue({
                      productId: product.id,
                      unitPrice: product.unitPrice
                     });

this.products[index] = [];
}



 addSubmit() {
    if(this.Type=="فرد" && this.invoicePersonalForm.valid){
    {
        console.log("Submit clicked");

  if (this.invoicePersonalForm.invalid) {
    console.log("Form is invalid ❌");
    this.invoicePersonalForm.markAllAsTouched();
    return;
  }

      console.log(this.invoicePersonalForm.getRawValue())
  this._InvoiceService.addInvoice(this.invoicePersonalForm.getRawValue()).subscribe({
          next:(res)=>{
            console.log(res);
            this._Router.navigate(['/invoices']);
      },
      error:(err)=>{
console.log("Full error:", err);
  console.log("Server error:", err.error);      }
    });}
    }

    else if(this.Type=="شركة" && this.invoiceCompanyForm.valid){
      {
        this._InvoiceService.addInvoice(this.invoiceCompanyForm.value).subscribe({
          next:(res)=>{
            console.log(res);
            this._Router.navigate(['/invoices']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  
  }}}

  sendNationalId(nationalId : string) {
 // const input = event.target as HTMLInputElement; // cast
  const value = nationalId
    if (value.length === 14) {

    this._CustomerService.searchByNationalId(value).subscribe({
      next:(res)=>{
        console.log(res)
        this.customerData=res
this.invoicePersonalForm.patchValue({
         customerId:res.id,
         name:res.name,
         city:res.city,
         governate:res.governate,

        });        
      }
    })
  }
}
}
