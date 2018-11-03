import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { MessagesService } from 'src/app/services/messages.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-edit-marks-sheet',
  templateUrl: './edit-marks-sheet.component.html',
  styleUrls: ['./edit-marks-sheet.component.scss']
})
export class EditMarksSheetComponent implements OnInit {

  private id;
  private marksSheet;
  private marksSheetForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private teacherService: TeacherService,
    private ms: MessagesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.getMarksSheet();
    });

  }

  createForm() {
    this.marksSheetForm = this.fb.group({
      title: [this.marksSheet.title, Validators.required],
      marksArray: this.fb.array(this.fillArray())
    });
  }

  fillArray() {
    const array = [];
    for (const mark of this.marksSheet.marksArray) {
      const element = this.createMarksFromData(mark.subject, mark.marks, mark.maxMarks, mark.passMarks);
      array.push(element);
    }
    return array;
  }

  createMarksFromData(s, m, mm, pm) {
    return this.fb.group({
      subject: [s, Validators.required],
      marks: [m, Validators.required],
      maxMarks: [mm],
      passMarks: [pm]
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

  getMarksSheet() {
    this.teacherService.getMarksSheet(this.id).subscribe(
      result => {
        this.marksSheet = result['marksSheet'];
        this.createForm();
      },
      error => {
        const msg = new Message(error.error['msg'], 'danger', 4000);
        this.ms.addMessages(msg);
      }
    );
  }

  onSubmit() {
    if (this.marksSheetForm.valid) {
      const data = {
        title: this.marksSheetForm.value.title,
        marksArray: this.marksSheetForm.value.marksArray
      };

      this.teacherService.updateMarksSheet(this.id, data).subscribe(
        result => {
          const msg = new Message(result['msg'], 'success', 4000);
          this.ms.addMessages(msg);
        },
        error => {
          const msg = new Message(error.error['msg'], 'danger', 4000);
          this.ms.addMessages(msg);
        }
      );

      this.router.navigate(['/teacher/student'], {queryParams: { id: this.marksSheet.studentId}});
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
