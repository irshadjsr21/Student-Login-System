import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-student-marks-sheet',
  templateUrl: './add-student-marks-sheet.component.html',
  styleUrls: ['./add-student-marks-sheet.component.scss']
})
export class AddStudentMarksSheetComponent implements OnInit {

  private id;
  private marksSheetForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private teacherService: TeacherService,
     private ms: MessagesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.id = params.id;
    });

    this.marksSheetForm = this.fb.group({
      title: ['', Validators.required],
      marksArray: this.fb.array([ this.createMarks() ])
    });
  }

  createMarks() {
    return this.fb.group({
      subject: ['', Validators.required],
      marks: ['', Validators.required],
      maxMarks: [''],
      passMarks: ['']
    });
  }

  onSubmit() {
    if (this.marksSheetForm.valid) {
      const marksSheet = {
        studentId: this.id,
        title: this.marksSheetForm.value.title,
        marksArray: this.marksSheetForm.value.marksArray
      };

      this.teacherService.addMarksSheet(marksSheet).subscribe(
        result => {
          console.log(result);
          const msg = new Message(result['msg'], 'success', 4000);
          this.ms.addMessages(msg);
        },
        error => {
          const msg = new Message(error.error['msg'], 'danger', 4000);
          this.ms.addMessages(msg);
        }
      );
      this.marksSheetForm.reset();
    }
  }

  // To Add FormGroup To Marks Array
  addMark() {
    const mark = this.createMarks();
    this.marksForm.push(mark);
  }

  // To Remove FormGroup To Marks Array
  removeMark(i) {
    this.marksForm.removeAt(i);
  }

  get fc() {
    return this.marksSheetForm.controls;
  }

  get marksForm() {
    return this.marksSheetForm.get('marksArray') as FormArray;
  }
}
