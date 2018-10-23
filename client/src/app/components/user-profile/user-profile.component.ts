import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: string;
  student;
  teacher;

  constructor(private authService: AuthService, private ms: MessagesService) { }

  ngOnInit() {
    this.user = this.authService.whoLoggedIn();
    if (this.user === 'student') {
      this.getStudentDetails();
    } else if (this.user === 'teacher') {
      this.getTeacherDetails();
    }
  }

  getStudentDetails() {
    this.authService.getStudentDetails().subscribe(
      result => {
        this.student = result['student'];
      },
      error => {
        if (error.error['msg']) {
          const msg = new Message(error.error['msg'], 'danger', 4000);
          this.ms.addMessages(msg);
        }
      }
    );
  }

  getTeacherDetails() {
    this.authService.getTeacherDetails().subscribe(
      result => {
        this.teacher = result['teacher'];
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
