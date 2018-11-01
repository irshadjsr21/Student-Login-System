import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:3000/api/student/';

  constructor(private http: HttpClient) { }

  getMarksSheets() {
    return this.http.get(this.baseUrl + 'marks_sheets');
  }
}
