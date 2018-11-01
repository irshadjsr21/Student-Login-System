import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-my-marks',
  templateUrl: './my-marks.component.html',
  styleUrls: ['./my-marks.component.scss']
})
export class MyMarksComponent implements OnInit {

  private marksSheets;

  constructor(private studentService: StudentService, private ms: MessagesService) { }

  ngOnInit() {
    this.getMarksSheets();
  }

  getMarksSheets() {
    this.studentService.getMarksSheets().subscribe(
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
