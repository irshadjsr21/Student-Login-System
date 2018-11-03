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
    return this.http.post(this.baseUrl + 'marks_sheet', marksSheet);
  }

  getStudentMarksSheets(id) {
    return this.http.get(this.baseUrl + 'student_marks_sheets', {
      params: {
        id: id
      }
    });
  }

  updateMarksSheet(id, data) {
    return this.http.patch(this.baseUrl + 'marks_sheet/' + id, data);
  }

  deleteMarksSheet(id) {
    return this.http.delete(this.baseUrl + 'marks_sheet/' + id);
  }

  getMarksSheet(id) {
    return this.http.get(this.baseUrl + 'marks_sheet', {
      params: {
        id: id
      }
    });
  }

}
