import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-view-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
})
export class StudentsComponent implements OnInit {
  private router = inject(Router);
  private service = inject(ApiService);

  students: any[] = [];
  searchTerm: string = '';
  message: string = '';

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.service.getStudentsSchool(this.searchTerm).subscribe({
      next: 
      data => this.students = data,
      error: err => {
        console.error(err);
        this.message = "Failed to fetch students.";
      }
    });
  }

  onSearch(): void {
    this.fetchStudents();
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.service.deleteStudent(id).subscribe({
        next: res => {
          if (res.success) {
            alert('Student deleted successfully.');
            this.fetchStudents();
          } else {
            alert(res.error || 'Could not delete student.');
          }
        },
        error: err => {
          console.error(err);
          alert('Server error. Please try again.');
        }
      });
    }
  }
}