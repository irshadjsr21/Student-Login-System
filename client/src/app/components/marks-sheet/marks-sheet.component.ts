import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-marks-sheet',
  templateUrl: './marks-sheet.component.html',
  styleUrls: ['./marks-sheet.component.scss']
})
export class MarksSheetComponent implements OnInit {

  @Input()
  private marksSheets;

  constructor() { }

  ngOnInit() {
  }

}
