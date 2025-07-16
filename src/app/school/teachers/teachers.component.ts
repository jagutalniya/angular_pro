import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  searchTerm: string = '';
  teachers: any[] = [];
  schoolName: string = '';

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.fetchTeachers();
  }

  fetchTeachers(): void {
    this.service.getTeachersSchool(this.searchTerm).subscribe({
      next: data => this.teachers = data,
      error: err => console.error('Error fetching teachers:', err)
    });
  }

  onSearch(): void {
    this.fetchTeachers();
  }

  confirmDelete(id: number): void {
    if (confirm('Delete this teacher?')) {
      this.service.deleteTeacherSchool(id).subscribe({
        next: res => {
          if (res.success) {
            alert(res.message || 'Deleted!');
            this.fetchTeachers();
          } else {
            alert(res.error || 'Something went wrong');
          }
        },
        error: err => {
          console.error('Delete failed:', err);
          alert('Failed to delete teacher.');
        }
      });
    }
  }
}