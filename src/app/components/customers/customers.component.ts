import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { ICustomer } from '../../core/interfaces/icustomer';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { NgStyle } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-customers',
  standalone: true, 
  imports: [HeaderComponent, FormsModule, RouterLink, SearchPipe,NgStyle],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  private readonly _CustomerService=inject(CustomerService)

  customers:ICustomer[]=[];
  text:string="";

  ngOnInit(): void {
    this._CustomerService.getAllCustomers().subscribe({
      next:(res)=>{
        console.log(res);
        this.customers=res
      },
        error:(err)=> {
          console.log(err);
        }
    })
  }


  deleteCustomer(id:string){
      this._CustomerService.deleteCustomer(id).subscribe({
        next:(res)=>{
          console.log(res);
          Swal.fire({
        title: "تم الحذف!",
        text: "تم حذف العميل بنجاح.",
        icon: "success"
      });
          //remove deleted customer from customers list
          this.customers=this.customers.filter(c=>c.id!==id);
      },
        error:(err)=>{
          console.log(err);
        }
      })
  }
  
  deleteCustomerWithSweetAlert(id:string){
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
      this.deleteCustomer(id);
      
    }
  });
  }
}
