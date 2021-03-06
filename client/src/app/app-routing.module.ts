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
import { MyMarksComponent } from './components/forStudent/my-marks/my-marks.component';
import { StudentAuthGuard } from './auth/student-auth.guard';
import { EditMarksSheetComponent } from './components/forTeacher/edit-marks-sheet/edit-marks-sheet.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

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
  },
  {
    path: 'student/my_marks',
    component: MyMarksComponent,
    canActivate: [AuthGuard, StudentAuthGuard]
  },
  {
    path: 'teacher/edit_marks_sheet',
    component: EditMarksSheetComponent,
    canActivate: [AuthGuard, TeacherAuthGuard]
  },
  {
    path: 'change_password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
