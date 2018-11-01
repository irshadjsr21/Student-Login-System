import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksSheetComponent } from './marks-sheet.component';

describe('MarksSheetComponent', () => {
  let component: MarksSheetComponent;
  let fixture: ComponentFixture<MarksSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
