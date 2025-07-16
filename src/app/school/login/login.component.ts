import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-school-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
username = '';
  password = '';
  errorMessage = '';

  constructor(private service: ApiService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }

    const loginData = {
      username: this.username,
      password: this.password
    };

    this.service.schoolLogin(loginData).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('school', JSON.stringify(res.school));
          this.router.navigate(['/school/dashboard']);
        } else {
          this.errorMessage = res.message || 'Invalid credentials.';
        }
      },
      error: () => {
        this.errorMessage = 'Server error.';
      }
    });
  }
}