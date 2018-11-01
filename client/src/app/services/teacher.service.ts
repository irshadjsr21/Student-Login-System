import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = 'http://localhost:3000/api/teacher/';

  constructor(private http: HttpClient) { }

  getMyStudents(clas) {
    return this.http.get(this.baseUrl + 'my_students', {
      params: {
        year: clas.year,
        section: clas.section
      }
    });
  }
}
