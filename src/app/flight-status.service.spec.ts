import { TestBed, inject } from '@angular/core/testing';

import { FlightStatusService } from './flight-status.service';

describe('FlightStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightStatusService]
    });
  });

  it('should be created', inject([FlightStatusService], (service: FlightStatusService) => {
    expect(service).toBeTruthy();
  }));
});
