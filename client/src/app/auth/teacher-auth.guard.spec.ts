import { TestBed, async, inject } from '@angular/core/testing';

import { TeacherAuthGuard } from './teacher-auth.guard';

describe('TeacherAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherAuthGuard]
    });
  });

  it('should ...', inject([TeacherAuthGuard], (guard: TeacherAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
