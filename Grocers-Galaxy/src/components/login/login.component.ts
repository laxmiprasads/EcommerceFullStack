import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.model';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username!: string;
  password!: string;
  role!: string;
  email!: string;
  isadmin:boolean = false;


  constructor(private userService: UserService,private router:Router) {}

  gotohome(){
    const user: Login = {
              username: this.username,
              password: this.password
            }
    this.userService.getUser(user).subscribe({
      next: (user) => {
        if(user){
          this.userService.setRole(user.role);
          this.userService.setEmail(user.email);
          this.userService.setUsername(user.username);
          this.router.navigate(['products']);
        }
      },
      error: (error) => {
        if(error.error.message == "User not found" || error.error.message == "Invalid credentials"){
          alert('Invalid username or password, Please try again');
          this.username = '';
          this.password = '';
        }
      }
    })
  }
  gotosignup(){
    this.router.navigate(['signup']);
  }
}