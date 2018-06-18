import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FlightStatusService, defaultResponse } from './flight-status.service';
import { throwError } from 'rxjs';

describe('FlightStatusService', () => {
  let service: FlightStatusService;
  let httpMock: HttpTestingController;

  const baseUrl = `https://us-central1-gcp-meetup-204422.cloudfunctions.net/awesomeFlightStatus`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FlightStatusService ]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(FlightStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set date and flight params', () => {
    const date = new Date();
    const expectedDate = date.toISOString();
    const flight = 'LA707';
    const expectedUrl = `${baseUrl}?date=${expectedDate}&flight=${flight}`;

    service
      .find(date, flight)
      .subscribe();

    const req = httpMock.expectOne(expectedUrl);
    req.flush({});

    expect(req.request.params.get('date')).toEqual(expectedDate);
    expect(req.request.params.get('flight')).toEqual(flight);
  });

  // it('should response a default response on error', () => {
  //   const date = new Date();
  //   const expectedDate = date.toISOString();
  //   const flight = 'LA707';
  //   const expectedUrl = `${baseUrl}?date=${expectedDate}&flight=${flight}`;

  //   service
  //     .find(date, flight)
  //     .subscribe(response => expect(response).toEqual(defaultResponse));

  //   const req = httpMock.expectOne(expectedUrl);
  //   req.flush(throwError(new Error()));
  // });
});
