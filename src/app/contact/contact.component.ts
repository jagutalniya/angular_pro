import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost/api/contact.php', this.formData).subscribe({
      next: (res) => {
        alert('Message sent successfully!');
        this.formData = { name: '', email: '', message: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong!');
      }
    });
  }
}
