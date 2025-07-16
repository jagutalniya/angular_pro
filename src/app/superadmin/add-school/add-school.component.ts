import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-school',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './add-school.component.html',
  styleUrl: './add-school.component.css'
})
export class AddSchoolComponent {
  school_name = '';
  username = '';
  password = '';
  errorMsg = '';
  successMsg = '';

  constructor(private service: ApiService) {}

  addSchool() {
    if (!this.school_name || !this.username || !this.password) {
      this.errorMsg = 'All fields are required.';
      return;
    }

    const data = {
      school_name: this.school_name,
      username: this.username,
      password: this.password
    };

    this.service.addSchool(data).subscribe({
      next: (res) => {
        this.successMsg = res.message;
        this.errorMsg = '';
        this.school_name = '';
        this.username = '';
        this.password = '';
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Something went wrong!';
        this.successMsg = '';
      }
    });
  }
}