import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesService } from './services/messages.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { StudentAuthGuard } from './auth/student-auth.guard';
import { TeacherAuthGuard } from './auth/teacher-auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { StudentsListComponent } from './components/forTeacher/students-list/students-list.component';
import { StudentDetailsComponent } from './components/forTeacher/student-details/student-details.component';
import { AddStudentMarksSheetComponent } from './components/forTeacher/add-student-marks-sheet/add-student-marks-sheet.component';
import { MarksSheetComponent } from './components/marks-sheet/marks-sheet.component';
import { MyMarksComponent } from './components/forStudent/my-marks/my-marks.component';
import { EditMarksSheetComponent } from './components/forTeacher/edit-marks-sheet/edit-marks-sheet.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    MessagesComponent,
    UserProfileComponent,
    StudentsListComponent,
    StudentDetailsComponent,
    AddStudentMarksSheetComponent,
    MarksSheetComponent,
    MyMarksComponent,
    EditMarksSheetComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthService, MessagesService, StudentAuthGuard, TeacherAuthGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
