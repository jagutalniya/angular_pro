import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  }
  error = '';

  constructor(private service: ApiService, private router: Router) {}

  login() {
    this.service.studentLogin(this.loginData).subscribe({
      next: res => {
        if (res.success) {
          localStorage.setItem('student', JSON.stringify(res.student));
          this.router.navigate(['/student/dashboard']);
        } else {
          this.error = res.message || 'Login failed';
        }
      },
        error: (err) => {
        this.error = 'Server error, please try again latter';
        console.error(err);
      }
    });
  }
}
