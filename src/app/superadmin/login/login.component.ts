import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { HeaderComponent } from "../../header/header.component";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-superadmin-login',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  }
  error = '';

  constructor(private service: ApiService, private router: Router) { }

  onSubmit() {
    this.service.superLogin(this.loginData).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('superadmin', res.username);
          this.router.navigate(['superadmin/dashboard']);
        } else {
          this.error = res.message;
        }
      },
      error: (err) => {
        this.error = 'Server error, please try again latter';
        console.error(err);
      }
    });
  }
}
