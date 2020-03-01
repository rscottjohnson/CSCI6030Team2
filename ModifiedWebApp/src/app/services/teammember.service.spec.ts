import { TestBed } from '@angular/core/testing';

import { TeammembereService } from './teammember.service';

describe('TeammemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeammemberService = TestBed.get(TeammemberService);
    expect(service).toBeTruthy();
  });
});
