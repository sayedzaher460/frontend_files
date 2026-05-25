import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.scss'
})
export class AddcustomerComponent  {

  private readonly _CustomerService=inject(CustomerService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)

  Type:string="فرد";

  selectType(type:string){
    this.Type=type;
  }

    addPersonalForm=this._FormBuilder.group({  
         name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
         type:["فرد",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
         city:[null,[Validators.minLength(3),Validators.maxLength(25)]],
         phone:[null,[Validators.maxLength(25),Validators.pattern('^[0-9]+$')]],
         governate:[null,[Validators.minLength(3),Validators.maxLength(25)]],
         nationalId:[null,[Validators.required, Validators.pattern(/^\d{14}$/)]],
        street:[null],              
        taxNumber:[null],
        });

         addCompanyForm=this._FormBuilder.group({  
          name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
          type:["شركة",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
          city:[null,[Validators.minLength(3),Validators.maxLength(25)]],
          phone:[null,[Validators.minLength(3),Validators.maxLength(25),Validators.pattern('^[0-9]+$')]],
          governate:[null,[Validators.minLength(3),Validators.maxLength(25)]],
          taxNumber:[null,[Validators.required,Validators.pattern('^[0-9]+$')]],
        nationalId:[null],
         street:[null],
        });

   addSubmit() {
    if(this.Type=="فرد" && this.addPersonalForm.valid){
    {
      this._CustomerService.addCustomer(this.addPersonalForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._Router.navigate(['/customers']);
    },
    error:(err)=>{
      console.log(err);
    }
  });
}
    }

    else if(this.Type=="شركة" && this.addCompanyForm.valid){
      {
        this._CustomerService.addCustomer(this.addCompanyForm.value).subscribe({
          next:(res)=>{
            console.log(res);
            this._Router.navigate(['/customers']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  
  }}}

}