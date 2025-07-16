import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  teachers: any[] = [];
  page: number = 1;
  limit: number = 10;
  total: number = 0;

  constructor(private service: ApiService, private http: HttpClient) {}

 ngOnInit(): void {
    this.fetchTeachers();
  }

  fetchTeachers() {
    this.service.getTeachers(this.page, this.limit).subscribe(res => {
      if (res.success) {
        this.teachers = res.teachers;
        this.total = res.total;
      }
    });
  }

  goToPage(newPage: number) {
    this.page = newPage;
    this.fetchTeachers();
  }

  totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  pagesArray(): number[] {
    return Array(this.totalPages()).fill(0).map((_, i) => i + 1);
  }
}