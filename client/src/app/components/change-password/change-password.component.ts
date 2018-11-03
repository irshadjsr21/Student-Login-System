import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private form: FormGroup;

  constructor(private authService: AuthService, private ms: MessagesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        password: this.form.value.password,
        newPassword: this.form.value.newPassword
      };

      this.authService.changePassword(data).subscribe(
        result => {
          const msg = new Message(result['msg'], 'success', 4000);
          this.ms.addMessages(msg);
          this.router.navigateByUrl('/profile');
        },
        error => {
          const msg = new Message(error.error['msg'], 'danger', 4000);
          this.ms.addMessages(msg);
          this.form.reset();
        }
      );
    }
  }

  get fc() {
    return this.form.controls;
  }

}
