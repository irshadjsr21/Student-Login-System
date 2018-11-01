import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { StudentsListComponent } from './components/forTeacher/students-list/students-list.component';
import { TeacherAuthGuard } from './auth/teacher-auth.guard';
import { StudentDetailsComponent } from './components/forTeacher/student-details/student-details.component';
import { AddStudentMarksSheetComponent } from './components/forTeacher/add-student-marks-sheet/add-student-marks-sheet.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teacher/students_list',
    component: StudentsListComponent,
    canActivate: [AuthGuard, TeacherAuthGuard]
  },
  {
    path: 'teacher/student',
    component: StudentDetailsComponent,
    canActivate: [AuthGuard, TeacherAuthGuard]
  },
  {
    path: 'teacher/add_marks_sheet',
    component: AddStudentMarksSheetComponent,
    canActivate: [AuthGuard, TeacherAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
