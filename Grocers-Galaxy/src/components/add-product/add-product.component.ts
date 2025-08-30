import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from '../products/products.component';

@Component({
  selector: 'app-add-product',
  imports: [RouterModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  title: string = '';
  price: number = 0;
  description: string = '';
  brand: string = '';
  status: string = '';
  stock: number = 0;

  constructor(private productService: ProductService,private router: Router) {}
  
  role = localStorage.getItem('role');
  addpBtn(){
    const newProduct: Product = {
      title: this.title,
      price: this.price,
      description: this.description,
      brand: this.brand,
      status: this.status,
      stock: this.stock
    }   
    this.productService.addProduct(newProduct).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    })
    this.reset();
  }


  reset(){
    this.title='',
      this.price=0,
      this.description='',
      this.brand='',
      this.status="",
      this.stock=0
  }
  gotohome(){
    this.router.navigate(['products']);
  }
}