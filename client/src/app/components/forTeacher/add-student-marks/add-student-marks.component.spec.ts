import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentMarksComponent } from './add-student-marks.component';

describe('AddStudentMarksComponent', () => {
  let component: AddStudentMarksComponent;
  let fixture: ComponentFixture<AddStudentMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
