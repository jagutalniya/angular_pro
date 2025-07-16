import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  superUrl = 'http://localhost/api/superadmin/';

  constructor(private http: HttpClient) { }

  superLogin(data: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.superUrl + 'login.php', data);
  }

  getSuperData(): Observable<any> {
    return this.http.get<any>(this.superUrl + 'dashboard.php');
  }

  deleteSchool(id: number): Observable<any> {
    return this.http.post<any>(this.superUrl, { id } + 'dashboard.php');
  }

  getTeachers(page: number, limit: number): Observable<any> {
    const url = `${this.superUrl + 'teachers.php'}?page=${page}&limit=${limit}`;
    return this.http.get<any>(url);
  }

  getStudents(page: number, search: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);

    return this.http.get<any>(this.superUrl + 'students.php', { params });
  }

  addSchool(data: { school_name: string, username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.superUrl + 'add-school.php', data);
  }

  private schoolUrl = 'http://localhost/api/school/';

  schoolLogin(data: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.schoolUrl + 'login.php', data, { withCredentials: true });
  }

  getSchoolData(): Observable<any> {
    return this.http.get<any>(this.schoolUrl + 'dashboard.php', {
      withCredentials: true
    });
  }

  getTeachersSchool(searchTerm: string = ''): Observable<any[]> {
    const url = this.schoolUrl + 'teachers.php' + (searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '');
    return this.http.get<any[]>(url, { withCredentials: true });
  }

  deleteTeacherSchool(id: number): Observable<{ success?: boolean; message?: string; error?: string }> {
    const url = this.schoolUrl + `delete-teacher.php?id=${id}`;
    return this.http.get<{ success?: boolean; message?: string; error?: string }>(url, {
      withCredentials: true
    });
  }

  getTeacherById(id: number): Observable<any> {
    return this.http.get<any>(this.schoolUrl + `teachers.php?id=${id}`, {
      withCredentials: true
    });
  }

  updateTeacher(teacher: { id: number; name: string; subject: string }): Observable<any> {
    return this.http.post<any>(this.schoolUrl + 'update-teacher.php', teacher, {
      withCredentials: true
    });
  }

  addTeacher(teacher: {
    username: string;
    password: string;
    name: string;
    subject: string;
  }): Observable<any> {
    return this.http.post<any>(this.schoolUrl + 'add-teacher.php', teacher, {
      withCredentials: true
    });
  }

  getStudentsSchool(search: string = ''): Observable<any[]> {
    const url = this.schoolUrl + 'students.php' + (search ? `?search=${encodeURIComponent(search)}` : '');
    return this.http.get<any[]>(url, { withCredentials: true });
  }

  deleteStudent(id: number): Observable<{ success?: boolean; message?: string; error?: string }> {
    return this.http.get<{ success?: boolean; message?: string; error?: string }>(
      `${this.schoolUrl}delete-student.php?id=${id}`,
      { withCredentials: true }
    );
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(this.schoolUrl + `students.php?id=${id}`, {
      withCredentials: true
    });
  }

  updateStudent(student: {
    id: number;
    name: string;
    class: string;
    gender: string;
    address: string;
  }): Observable<any> {
    return this.http.post<any>(this.schoolUrl + 'update-student.php', student, {
      withCredentials: true
    });
  }


  private teacherUrl = 'http://localhost/api/teacher/';

  getTeacherName(): Observable<any> {
    return this.http.get<any>(this.teacherUrl + 'dashboard.php', {
      withCredentials: true
    });
  }

  teacherLogin(data: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.teacherUrl + 'login.php', data, {
      withCredentials: true
    });
    }


  getTeacherDashboard(): Observable<any> {
    return this.http.get<any>(this.teacherUrl + 'dashboard.php', {
      withCredentials: true,
    });
  }

  getStudentsTeacher(page: number, search: string = ''): Observable<any> {
    const url = `${this.teacherUrl}students.php?page=${page}&search=${encodeURIComponent(search)}`;
    return this.http.get<any>(url, { withCredentials: true });
  }

  deleteStudentTeacher(id: number): Observable<any> {
    return this.http.get(`${this.teacherUrl}delete-student.php?id=${id}`, { withCredentials: true });

  }

  getStudentByIdTeacher(id: number): Observable<any> {
    return this.http.get<any>(`${this.teacherUrl}students.php?id=${id}`, { withCredentials: true });
  }

  updateStudentTeacher(data: any): Observable<any> {
    return this.http.post(this.schoolUrl + 'update-student.php', data, { withCredentials: true });
  }

  addStudent(data: any): Observable<any> {
    return this.http.post<any>(this.teacherUrl + 'add-student.php', data, { withCredentials: true });
  }

  private stdUrl = 'http://localhost/api/student/';
  
  studentLogin(data: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.stdUrl + 'login.php', data, {
      withCredentials: true
    });
    }

    getStudentDashboard(): Observable<any> {
    return this.http.get<any>(this.stdUrl + 'dashboard.php', {
      withCredentials: true,
    });
  }

}

