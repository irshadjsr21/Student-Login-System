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

  getStudent(id) {
    return this.http.get(this.baseUrl + 'student', {
      params: {
        id: id
      }
    });
  }

  addMarksSheet(marksSheet) {
    return this.http.post(this.baseUrl + 'add_marks_sheet', marksSheet);
  }

  getMarksSheets(id) {
    return this.http.get(this.baseUrl + 'marks_sheet', {
      params: {
        id: id
      }
    });
  }

}
