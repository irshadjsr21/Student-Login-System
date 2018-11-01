import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  private classes = [];
  private students = [];

  constructor(private authService: AuthService, private teacherService: TeacherService, private ms: MessagesService) { }

  ngOnInit() {
    this.getStudentsList();
  }

  getStudentsList() {
    this.authService.getTeacherDetails().subscribe(
      result => {
        this.classes = result['teacher'].classes;
        let i = 0;
        this.classes.forEach(clas => {
          this.teacherService.getMyStudents(clas).subscribe(
            res => {
              this.students.push(res['students']);
            },
            error => {
              if (error.error['msg']) {
                const msg = new Message(error.error['msg'], 'danger', 4000);
                this.ms.addMessages(msg);
              }
            }
            );
            i++;
          });
        },
        error => {
          if (error.error['msg']) {
            const msg = new Message(error.error['msg'], 'danger', 4000);
            this.ms.addMessages(msg);
          }
        }
      );
  }
}
