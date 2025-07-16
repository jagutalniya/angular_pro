import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  schoolName = '';
  http = inject(HttpClient);
  router = inject(Router);

  ngOnInit(): void {
      this.http.get<any>('http://localhost/api/school/dashboard.php', { withCredentials: true }).subscribe({
      next: data => {
        this.schoolName = data.school_name;
      }
  });
}
logout(){
    localStorage.removeItem('school');
    this.router.navigate(['']);
  }
}