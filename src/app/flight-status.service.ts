import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError, retryWhen } from 'rxjs/operators';

export const defaultResponse: any = {
  'flight': 'LA600',
  'date': '2018-05-18T00:00:00.000Z',
  'generalStatus': 'Scheduled',
  'airports': [
    {
      'status': 'Scheduled',
      'city': 'Santiago',
      'fullAirport': 'Arturo Merino Benitez',
      'code': 'SCL',
      'departureDate': '2018-05-18T00:00:00.000Z',
      'weather': {
        'description': 'Cloudy sky',
        'temperature': '23',
        'icon': 'http://openweathermap.org/img/w/04n.png'
      }

    },
    {
      'status': 'Scheduled',
      'city': 'Lima',
      'fullAirport': 'ATO Lima',
      'code': 'LIM',
      'departureDate': '2018-05-18T00:00:00.000Z',
      'weather': {
        'description': 'Cloudy sky',
        'temperature': '24',
        'icon': 'http://openweathermap.org/img/w/04n.png'
      }
    },
    {
      'status': 'Scheduled',
      'city': 'Los Angeles',
      'fullAirport': 'Ato Los Angeles',
      'code': 'LAX',
      'departureDate': '2018-05-18T00:00:00.000Z',
      'weather': {
        'description': 'Cloudy sky',
        'temperature': '24',
        'icon': 'http://openweathermap.org/img/w/04n.png'
      }
    }
  ]
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
      catchError(() => of(defaultResponse))
    );
  }

}
