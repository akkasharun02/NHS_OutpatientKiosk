import { TestBed } from '@angular/core/testing';

import { PatientDetialsService } from './patient-detials.service';

describe('PatientDetialsService', () => {
  let service: PatientDetialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientDetialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
