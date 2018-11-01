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
import { AddStudentMarksComponent } from './components/forTeacher/add-student-marks/add-student-marks.component';

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
    AddStudentMarksComponent
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
