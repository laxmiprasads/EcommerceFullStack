import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-product',
  imports: [ProductCardComponent,CommonModule,HttpClientModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true
})
export class ProductComponent {
  userdetails: string ='';
  constructor(private userService: UserService,private productService: ProductService,private router:Router) { }
  isPopupVisible = false;
  username!: string;
  email!: string;
  role!: string;

  showPopup() {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.role = this.userService.getRole();
        this.email = this.userService.getEmail();
        this.username = this.userService.getUsername();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    })        
  }
  gotologin(){
    this.router.navigate(['']);
  }
  gotoaddproduct(){
    this.router.navigate(['addproduct']);
  }
  gotohome(){
    this.router.navigate(['products']);
  }
  products: Product[]= [];
}
