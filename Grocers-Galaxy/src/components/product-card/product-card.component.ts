import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { FormsModule } from '@angular/forms';
import { StockHighlightDirective } from '../../directives/stock-highlight.directive';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,CartComponent,FormsModule, StockHighlightDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  showcart: boolean = false;
  category: string = 'allproducts';
  searchitem :string = '';
  role : string = 'Admin';


  viewcart() {
    this.showcart = !this.showcart;
  }
  expandedId: number | null = null;
    toggleDescription(id: number) {
      this.expandedId = this.expandedId === id ? null : id;
    }

  
  @Input() products: Product[] =[];
  cartproducts: Product[] =[];
  constructor(private userService: UserService,private productService: ProductService) {}
  
  filteredProducts(){
    return this.products.filter(p => {
      const MatchSearch =p.title && p.title.toLowerCase().includes(this.searchitem?.toLowerCase())
      const MatchStock =
        this.category === 'allproducts' ||
        (this.category === 'instock' && p.status === 'Instock') ||
        (this.category === 'outofstock' && p.status === 'Out of stock');
      return MatchSearch && MatchStock;
    });
    }
    
  ngOnInit() {
    this.filteredProducts();
    this.role = this.userService.getRole();
  }
  
  atcbtn(product: Product) {
    if (!this.cartproducts.find(p => p.id === product.id)) {
      this.cartproducts.push(product);
    }
  }
  
  ondelete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
      }
    })
  }
  // onincrease(id:number){
  //   this.productService.deleteProduct(id).subscribe({
  //     next: () => {
  //       this.products = this.products.filter(product => product.id !== id);
  //     }
  //   })
  // }
}