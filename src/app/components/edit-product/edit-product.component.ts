import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent  implements OnInit ,OnDestroy{
  private readonly _ProductsService=inject(ProductsService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _formBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)


  detailsProduct:IProduct | null=null;

updateProductForm = this._formBuilder.group({
  name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
  code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
  unitPrice: [1, [Validators.required, Validators.min(1)]],
  stockQuantity: [0, [Validators.required, Validators.min(0)]],
});


getProductByIdSub!:Subscription
updateProductSub!:Subscription
routeSub!:Subscription
  ngOnInit(): void {
  
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let productId=params.get('id');
        
        //call api to get data of product by id
   this.getProductByIdSub = this._ProductsService.getProductById(productId!).subscribe({
          next:(response)=>{
            this.detailsProduct=response;
            console.log(response);


               //set vlaues into form
               if(this.detailsProduct){
        this.updateProductForm.patchValue({
          name:this.detailsProduct.name,
          code:this.detailsProduct.code,
          unitPrice:this.detailsProduct.unitPrice,
          stockQuantity:this.detailsProduct.stockQuantity
         });
    }
  }
});
     

      }
    })
  }

  updateSubmit(){
    if(this.updateProductForm.valid){
      console.log(this.updateProductForm.value);
    this.updateProductSub = this._ProductsService.updateProduct(this.detailsProduct!.id,this.updateProductForm.value).subscribe({
        next:(res)=>{
          console.log(res);

          //navigate to products page
          this._Router.navigate(['/products']);
    }
    })}}

    ngOnDestroy(): void {
      this.getProductByIdSub?.unsubscribe();
      this.updateProductSub?.unsubscribe();
        this.routeSub?.unsubscribe();

    }
}
