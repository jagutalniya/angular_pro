import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
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
    this.service.getStudentByIdTeacher(id).subscribe({
      next: data => this.student = data,
      error: err => {
        console.error(err);
        alert('Could not load student data.');
        this.router.navigate(['/teacher/students']);
      }
    });
  }

  updateStudent() {
    this.service.updateStudentTeacher(this.student).subscribe({
      next: () => {
        alert('Student updated.');
        this.router.navigate(['/teacher/students']);
      },
      error: err => {
        console.error(err);
        alert('Update failed.');
      }
    });
  }
}