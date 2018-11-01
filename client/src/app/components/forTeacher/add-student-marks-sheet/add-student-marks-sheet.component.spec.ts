import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentMarksSheetComponent } from './add-student-marks-sheet.component';

describe('AddStudentMarksSheetComponent', () => {
  let component: AddStudentMarksSheetComponent;
  let fixture: ComponentFixture<AddStudentMarksSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentMarksSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentMarksSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
