import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddcustomerComponent } from './components/addcustomer/addcustomer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { DetailInvoiceComponent } from './components/detail-invoice/detail-invoice.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';

export const routes: Routes = [
     {path:'',component:LayoutComponent,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'products',component:ProductsComponent },
        {path:'customers',component:CustomersComponent},
        {path:'invoices',component:InvoicesComponent},
        {path:'reports',component:ReportsComponent},
        {path:'AddProduct',component:AddproductComponent},
        {path:'EditProduct/:id',component:EditProductComponent},
        {path:'AddCustomer',component:AddcustomerComponent},
        {path:'EditCustomer/:id',component:UpdateCustomerComponent},
        {path:'DetailInvoice/:id',component:DetailInvoiceComponent},
        {path:'AddInvoice',component:AddInvoiceComponent}

    ]},
    {path:'**',component:NotfoundComponent}
];
