import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
})
export class AddTeacherComponent implements OnInit {
  private router = inject(Router);
  private service = inject(ApiService);

  teacher = {
    username: '',
    password: '',
    name: '',
    subject: '',
  };

  errorMsg: string = '';
  fieldErrors: any = {};

  ngOnInit(): void {}

  validate(): boolean {
    this.fieldErrors = {};
    const lettersOnly = /^[A-Za-z\s]+$/;
    let valid = true;

    if (!this.teacher.username.trim()) {
      this.fieldErrors.username = 'Please enter username.';
      valid = false;
    }

    if (!this.teacher.password.trim()) {
      this.fieldErrors.password = 'Please enter password.';
      valid = false;
    }

    if (!this.teacher.name.trim()) {
      this.fieldErrors.name = 'Please enter full name.';
      valid = false;
    } else if (!lettersOnly.test(this.teacher.name)) {
      this.fieldErrors.name = 'Name must contain only letters and spaces.';
      valid = false;
    }

    if (!this.teacher.subject.trim()) {
      this.fieldErrors.subject = 'Please enter subject.';
      valid = false;
    } else if (!lettersOnly.test(this.teacher.subject)) {
      this.fieldErrors.subject = 'Subject must contain only letters and spaces.';
      valid = false;
    }

    return valid;
  }

  submitForm(): void {
    this.errorMsg = '';
    if (!this.validate()) return;

    this.service.addTeacher(this.teacher).subscribe({
      next: () => {
        alert('Teacher added successfully!');
        this.router.navigate(['/school/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = err.error?.error || 'Failed to add teacher.';
      },
    });
  }
}