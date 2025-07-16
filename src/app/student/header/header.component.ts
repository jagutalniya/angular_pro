import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
private http = inject(HttpClient);
  private router = inject(Router);

  student: any = {};

  ngOnInit(): void {
    this.http.get<any>('http://localhost/api/student/dashboard.php', { withCredentials: true })
      .subscribe({
        next: data => {
          if (data.error) {
            alert('❌ ' + data.error);
            this.router.navigate(['/student/login']);
          } else {
            this.student = data;
          }
        },
        error: () => {
          alert('❌ Failed to fetch student info');
          this.router.navigate(['/student/login']);
        }
      });
  }

  logout() {
    localStorage.removeItem('student');
    this.router.navigate(['/']);
  }
}

