import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductsService } from '../../core/services/products.service';
import { error } from 'console';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../header/header.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule, HeaderComponent,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {

  private readonly _ProductsService=inject(ProductsService)
  
  productlist:IProduct[]=[]
  text:string="";


  getAllproductSub!:Subscription
  deleteProductSub!:Subscription

  ngOnInit(): void {
    this.getAllproductSub = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productlist=res
      },
        error:(err)=> {
          console.log(err);
        }
    })
  }

  deleteProduct(id:string){
    this.deleteProductSub = this._ProductsService.deleteProduct(id).subscribe({
      next:(res)=>{
        console.log(res);
        Swal.fire({
      title: "تم الحذف!",
      text: "تم حذف المنتج بنجاح.",
      icon: "success"
    });
        //remove deleted product from productlist
        this.productlist=this.productlist.filter(p=>p.id!==id);
    },
      error:(err)=>{
        console.log(err);
      }
    })
}

deleteProductWithSweetAlert(id:string){
  Swal.fire({
  title: "هل أنت متأكد من الحذف؟",
  text: "لا يمكنك التراجع عن هذا الإجراء!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText :"احذف",
  cancelButtonText : "لغاء!"
}).then((result) => {
  if (result.isConfirmed) {
    this.deleteProduct(id);
    
  }
});
}



ngOnDestroy(): void {
this.getAllproductSub?.unsubscribe();
this.deleteProductSub?.unsubscribe();
}
}