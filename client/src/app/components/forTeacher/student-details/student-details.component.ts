import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  private student;
  private id;
  private marksSheets;

  constructor(private activatedRoute: ActivatedRoute, private teacherService: TeacherService, private ms: MessagesService) { }

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe(params => {
      this.id = params.id;
      this.getStudent();
      this.getStudentMarksSheets();
    });
  }

  getStudent() {
    this.teacherService.getStudent(this.id).subscribe(
      result => {
        this.student = result['student'];
      },
      error => {
        const msg = new Message(error.error['msg'], 'danger', 4000);
        this.ms.addMessages(msg);
      }
    );
  }

  getStudentMarksSheets() {
    this.teacherService.getMarksSheets(this.id).subscribe(
      result => {
        this.marksSheets = result['marksSheets'];
      },
      error => {
        const msg = new Message(error.error['msg'], 'danger', 4000);
        this.ms.addMessages(msg);
      }
    );
  }

}
