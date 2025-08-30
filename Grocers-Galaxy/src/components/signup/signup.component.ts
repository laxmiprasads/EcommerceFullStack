import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'user';
  
  constructor(private userService: UserService,private router:Router) {}

  signup() {
    const newUser: User = {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role
        }
    this.userService.addUser(newUser).subscribe({
      next: (response) => {
        alert('Signup successful! Please login to continue.');
        this.router.navigate(['']);
      },
      error: (error) => {
        if(error.error.error == "Bad Request"){
          alert('Username or email already exists');
          this.username = '';
          this.email = '';
          this.password = '';
          this.role = 'user';
        }
      }
    });
  }
}
