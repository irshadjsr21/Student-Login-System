import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { AuthService } from 'src/app/services/auth.service';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Message } from 'src/app/models/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  studentForm: FormGroup;
  teacherForm: FormGroup;

  yearsArray = [1, 2, 3, 4];
  sectionArray = ['A', 'B', 'C', 'D', 'E'];
  role = 'student';

  constructor(private fb: FormBuilder, private authService: AuthService, private ms: MessagesService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  // To build Form Structure
  buildForm() {
    this.studentForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: '',
      email: ['', [Validators.required, Validators.email]],
      year: ['', Validators.required],
      section: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.teacherForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: '',
      email: ['', [Validators.required, Validators.email]],
      classes: this.fb.array([ this.createClass() ]),
      password: ['', Validators.required]
    });
  }

  // To handle student form submit
  onStudentSubmit() {
    if (this.studentForm.valid) {
      const student = new Student(this.studentForm.value.firstname, this.studentForm.value.lastname,
         this.studentForm.value.email, this.studentForm.value.password, this.studentForm.value.year, this.studentForm.value.section);

      this.authService.registerStudent(student).subscribe(
        result => {
          const msg = new Message(result['msg'], 'success', 4000);
          this.ms.addMessages(msg);
          this.router.navigateByUrl('/login');
        },
        error => {
          const msg = new Message(error.error['msg'], 'danger', 4000);
          this.ms.addMessages(msg);
        }
      );
      this.studentForm.reset();
    }
  }

  // To handle teacher form submit
  onTeacherSubmit() {
    if (this.teacherForm.valid) {
      const teacher = new Teacher(this.teacherForm.value.firstname, this.teacherForm.value.lastname,
        this.teacherForm.value.email, this.teacherForm.value.password, this.teacherForm.value.classes);

     this.authService.registerTeacher(teacher).subscribe(
       result => {
        const msg = new Message(result['msg'], 'success', 4000);
        this.ms.addMessages(msg);
        this.router.navigateByUrl('/login');
       },
       error => {
        const msg = new Message(error.error['msg'], 'danger', 4000);
        this.ms.addMessages(msg);
       }
     );
     this.teacherForm.reset();
    }
  }

  // To create class for teacher classes Array
  createClass() {
    return this.fb.group({
      year: ['', Validators.required],
      section: ['', Validators.required]
    });
  }

  // To Add Class to teacher classes array
  addClass() {
    const clas = this.createClass();
    this.classesForm.push(clas);
    console.log(this.classesForm);
  }

  // To remove class from teacher classes array
  removeClass(i) {
    this.classesForm.removeAt(i);
  }

  // To switch between student and teacher form
  roleChanged(event) {
    this.role = event.target.value;
  }

  // To get student form controls
  get sf() {
    return this.studentForm.controls;
  }

  // To get teacher form controls
  get tf() {
    return this.teacherForm.controls;
  }

  // To get classes of teacher form
  get classesForm() {
    return this.teacherForm.get('classes') as FormArray;
  }

}
