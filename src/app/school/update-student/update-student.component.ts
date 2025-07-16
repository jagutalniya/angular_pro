import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './update-student.component.html'
})
export class UpdateStudentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ApiService);

  student = {
    id: 0,
    name: '',
    class: '',
    gender: '',
    address: ''
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('Invalid student ID');
      this.router.navigate(['/school/students']);
      return;
    }

    this.service.getStudentById(id).subscribe({
      next: data => this.student = data,
      error: err => {
        console.error(err);
        alert('Could not load student data.');
        this.router.navigate(['/school/students']);
      }
    });
  }

  updateStudent(): void {
    this.service.updateStudent(this.student).subscribe({
      next: () => {
        alert('Student updated.');
        this.router.navigate(['/school/students']);
      },
      error: err => {
        console.error(err);
        alert('Update failed.');
      }
    });
  }
}