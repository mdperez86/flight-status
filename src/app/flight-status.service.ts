import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const defaultResponse: any = {
  flight: 'LA2012',
  date: '2018-05-18',
  origin: {
    city: 'Santiago',
    fullAirport: 'Arturo Merino Benitez',
    code: 'SCL'
  },
  destination: {
    city: 'Antofagasta',
    fullAirport: 'Andres Sabella',
    code: 'ANF'
  },
  status: 'On-Time',
  weather: {
    origin: {
      description: 'Cloudy sky',
      temperature: '23',
      icon: '04n'
    },
    destination: {
      description: 'Cloudy sky',
      temperature: '24',
      icon: '04n'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class FlightStatusService {

  private url = 'https://us-central1-gcp-meetup-204422.cloudfunctions.net/awesomeFlightStatus';

  constructor(private http: HttpClient) { }

  find(date: Date, flight: string): Observable<any> {
    return this.http.get(this.url, {
      params: new HttpParams()
        .set('date', `${date.toISOString()}`)
        .set('flight', flight)
    }).pipe(
      retry(2),
      catchError((error, caught) => of(defaultResponse))
    );
  }

}
