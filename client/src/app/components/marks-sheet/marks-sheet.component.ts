import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Message } from 'src/app/models/message.model';
import { MessagesService } from 'src/app/services/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-marks-sheet',
  templateUrl: './marks-sheet.component.html',
  styleUrls: ['./marks-sheet.component.scss']
})
export class MarksSheetComponent implements OnInit {

  private role;

  @Input()
  private marksSheets;

  @Output()
  private marksSheetDeleted = new EventEmitter<number>();

  constructor(private authService: AuthService, private teacherService: TeacherService,
     private ms: MessagesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.authService.whoLoggedIn();
  }

  deleteMarksSheet(id, i) {
    this.teacherService.deleteMarksSheet(id).subscribe(
      result => {
        const msg = new Message(result['msg'], 'success', 4000);
        this.ms.addMessages(msg);
        this.marksSheetDeleted.emit(i);
      },
      error => {
        const msg = new Message(error.error['msg'], 'danger', 4000);
        this.ms.addMessages(msg);
      }
    );
  }

}
