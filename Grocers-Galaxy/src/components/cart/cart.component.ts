import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private userService: UserService) {}
  role!:string;

  ngOnInit() {
    this.role = this.userService.getRole();
  }

  @Input() cartproducts: Product[] =[];
  expandedId: number | null = null;
    toggleDescription(id: number) {
      this.expandedId = this.expandedId === id ? null : id;
    }
  removeFromCart(id: number) {
    this.cartproducts = this.cartproducts.filter(product => product.id !== id);
  }
}