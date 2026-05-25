import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnDestroy {

  private readonly _formBuilder=inject(FormBuilder)
private readonly _ProductsService=inject(ProductsService)
private readonly _Router=inject(Router)

  addPeoductForm :FormGroup =this._formBuilder.group({
     name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(150)]],
     code:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(150)]],
     unitPrice:[null,[Validators.required,Validators.min(1)]],
     stockQuantity:[null,[Validators.required,Validators.min(0)]],
  });

  addproductsub!:Subscription
  addSubmit(){
    if(this.addPeoductForm.valid){
      console.log(this.addPeoductForm.value);
      this.addproductsub = this._ProductsService.addProduct(this.addPeoductForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._Router.navigate(['/products']);
    },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    else{
      this.addPeoductForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
this.addproductsub?.unsubscribe();
  }
}
