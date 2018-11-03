import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarksSheetComponent } from './edit-marks-sheet.component';

describe('EditMarksSheetComponent', () => {
  let component: EditMarksSheetComponent;
  let fixture: ComponentFixture<EditMarksSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMarksSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMarksSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
