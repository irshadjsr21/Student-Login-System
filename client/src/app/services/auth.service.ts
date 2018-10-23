import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  registerStudent(student: Student) {
    return this.http.post(this.baseUrl + 'auth/student/register', student);
  }

  registerTeacher(teacher: Teacher) {
    return this.http.post(this.baseUrl + 'auth/teacher/register', teacher);
  }
}
