import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/';

  private noAuthHeader = { headers: new HttpHeaders({'noAuth': 'True'}) };

  constructor(private http: HttpClient) { }

  registerStudent(student: Student) {
    return this.http.post(this.baseUrl + 'auth/student/register', student, this.noAuthHeader);
  }

  registerTeacher(teacher: Teacher) {
    return this.http.post(this.baseUrl + 'auth/teacher/register', teacher , this.noAuthHeader);
  }

  loginStudent(authDetails) {
    return this.http.post(this.baseUrl + 'auth/student/login', authDetails, this.noAuthHeader);
  }

  loginTeacher(authDetails) {
    return this.http.post(this.baseUrl + 'auth/teacher/login', authDetails, this.noAuthHeader);
  }

  getStudentDetails() {
    return this.http.get(this.baseUrl + 'auth/student/');
  }

  getTeacherDetails() {
    return this.http.get(this.baseUrl + 'auth/teacher/');
  }

  changePassword(data) {
    const role = this.whoLoggedIn();
    if (role === 'student') {
      return this.http.patch(this.baseUrl + 'auth/student/change_password', data);
    } else if (role === 'teacher') {
      return this.http.patch(this.baseUrl + 'auth/teacher/change_password', data);
    }
  }

  // Helper Functions
  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    }

    return null;
  }

  isStudentLoggedIn() {
    const payload = this.getUserPayload();
    if (payload) {
      if (payload['role'] === 'student') {
        return payload.exp > Date.now() / 1000;
      }
    }

    return false;
  }

  isTeacherLoggedIn() {
    const payload = this.getUserPayload();
    if (payload) {
      if (payload['role'] === 'teacher') {
        return payload.exp > Date.now() / 1000;
      }
    }

    return false;
  }

  whoLoggedIn() {
    return this.isStudentLoggedIn() ? 'student' : this.isTeacherLoggedIn() ? 'teacher' : null;
  }
}
