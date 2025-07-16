import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent {
  private service = inject(ApiService);
  private router = inject(Router);

  student = {
    username: '',
    password: '',
    name: '',
    class: '',
    gender: '',
    address: ''
  };

  message: string = '';
  error: string = '';

  addStudent() {
    this.message = '';
    this.error = '';

    if (!this.student.username || !this.student.password || !this.student.name ||
        !this.student.class || !this.student.gender || !this.student.address) {
      this.error = 'All fields are required.';
      return;
    }

    this.service.addStudent(this.student).subscribe({
      next: res => {
        if (res.success) {
          this.message = res.message;
          this.error = '';
          this.resetForm();
        } else {
          this.message = '';
          this.error = res.error || 'Failed to add student.';
        }
      },
      error: err => {
        console.error('Add Student Error:', err);
        this.message = '';
        this.error = err.error?.error || 'Something went wrong.';
      }
    });
  }

  resetForm() {
    this.student = {
      username: '',
      password: '',
      name: '',
      class: '',
      gender: '',
      address: ''
    };
  }
}