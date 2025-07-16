import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-edit-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './update-teacher.component.html'
})
export class UpdateTeacherComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ApiService);

  teacher = {
    id: 0,
    name: '',
    subject: ''
  };

  schoolName: string = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('Invalid teacher ID');
      this.router.navigate(['/school/teachers']);
      return;
    }

    this.service.getTeacherById(id).subscribe({
      next: data => this.teacher = data,
      error: err => {
        console.error(err);
        alert("Could not load teacher data.");
        this.router.navigate(['/school/teachers']);
      }
    });
  }

  updateTeacher(): void {
    this.service.updateTeacher(this.teacher).subscribe({
      next: () => {
        alert('Teacher updated');
        this.router.navigate(['/school/teachers']);
      },
      error: err => {
        console.error('Error:', err);
        alert('Update failed');
      }
    });
  }
}