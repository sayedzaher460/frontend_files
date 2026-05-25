import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICustomer } from '../../core/interfaces/icustomer';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [ ReactiveFormsModule,NgClass],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.scss'
})
export class UpdateCustomerComponent implements OnInit {
  private readonly _ProductsService=inject(CustomerService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)

    detailsCustomer:ICustomer ={} as ICustomer;
    Type:string="";

    updatePersonalForm=this._FormBuilder.group({  
             name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
             type:["فرد",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
             city:[null,[Validators.minLength(3),Validators.maxLength(25)]],
             phone:[null,[Validators.maxLength(25),Validators.pattern('^[0-9]+$')]],
             governate:[null,[Validators.minLength(3),Validators.maxLength(25)]],
             nationalId:[null,[Validators.required, Validators.pattern(/^\d{14}$/)]],
            street:[null],              
            taxNumber:[null],
            });
            
    updateCompanyForm=this._FormBuilder.group({  
          name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
          type:["شركة",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
          city:[null,[Validators.minLength(3),Validators.maxLength(25)]],
          phone:[null,[Validators.minLength(3),Validators.maxLength(25),Validators.pattern('^[0-9]+$')]],
          governate:[null,[Validators.minLength(3),Validators.maxLength(25)]],
          taxNumber:[null,[Validators.required,Validators.pattern('^[0-9]+$')]],
        nationalId:[null],
         street:[null],
        });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let customerId=params.get('id');


        this._ProductsService.getCustomerById(customerId!).subscribe({
          next:(response)=>{
            this.detailsCustomer=response;

            this.Type=this.detailsCustomer.type!;
            
            if(this.detailsCustomer.type==="شركة"){
              this.updateCompanyForm.patchValue({
          name:this.detailsCustomer.name,
          type:this.detailsCustomer.type,
          city:this.detailsCustomer.city,
          phone:this.detailsCustomer.phone,
          governate:this.detailsCustomer.governate,
          taxNumber:this.detailsCustomer.taxNumber 
         });
            }else{
              this.updatePersonalForm.patchValue(this.detailsCustomer as ICustomer );
            }
          }
        })



      }
    }) 
  
  }

 updateSubmit(){
    if(this.updatePersonalForm.valid){
      console.log(this.updatePersonalForm.value);
     this._ProductsService.updateCustomer(this.detailsCustomer!.id,this.updatePersonalForm.value).subscribe({
        next:(res)=>{
          console.log(res);

          //navigate to products page
          this._Router.navigate(['/customers']);
    }
    })}
  else if(this.updateCompanyForm.valid){
    console.log(this.updateCompanyForm.value);
      this._ProductsService.updateCustomer(this.detailsCustomer!.id,this.updateCompanyForm.value).subscribe({
        next:(res)=>{
          console.log(res);

          //navigate to products page
          this._Router.navigate(['/customers']);
    }
    })}
  }

}