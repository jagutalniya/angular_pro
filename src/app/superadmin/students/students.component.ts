import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  search: string = '';
  page: number = 1;
  totalPages: number = 0;
  username = localStorage.getItem('superadmin') || 'Super Admin';
  currentYear = new Date().getFullYear();

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.service.getStudents(this.page, this.search).subscribe(res => {
      this.students = res.students;
      this.totalPages = res.pages;
    });
  }

  onSearch(): void {
    this.page = 1;
    this.fetchStudents();
  }

  goToPage(p: number): void {
    this.page = p;
    this.fetchStudents();
  }
}