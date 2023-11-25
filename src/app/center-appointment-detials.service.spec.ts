import { TestBed } from '@angular/core/testing';

import { CenterAppointmentDetialsService } from './center-appointment-detials.service';

describe('CenterAppointmentDetialsService', () => {
  let service: CenterAppointmentDetialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterAppointmentDetialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
