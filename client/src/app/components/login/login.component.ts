import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  studentForm: FormGroup;
  teacherForm: FormGroup;

  role = 'student';

  constructor(private fb: FormBuilder, private authService: AuthService, private ms: MessagesService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.teacherForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.studentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onStudentSubmit() {
    if (this.studentForm.valid) {
      this.authService.loginStudent(this.studentForm.value).subscribe(
        result => {
          this.authService.setToken(result['token']);
          const msg = new Message(result['msg'], 'success', 4000);
          this.ms.addMessages(msg);
          this.router.navigateByUrl('/home');
        },
        error => {
          const msg = new Message(error.error['msg'], 'danger', 4000);
          this.ms.addMessages(msg);
        }
      );
      this.studentForm.reset();
    }
  }

  onTeacherSubmit() {
    if (this.teacherForm.valid) {
     this.authService.loginTeacher(this.teacherForm.value).subscribe(
       result => {
        this.authService.setToken(result['token']);
        const msg = new Message(result['msg'], 'success', 4000);
        this.ms.addMessages(msg);
        this.router.navigateByUrl('/home');
       },
       error => {
        const msg = new Message(error.error['msg'], 'danger', 4000);
        this.ms.addMessages(msg);
       }
     );
     this.teacherForm.reset();
    }
  }

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

}
