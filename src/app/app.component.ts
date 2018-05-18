import { Component, OnInit } from '@angular/core';
import { FlightStatusService } from './flight-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  fligthStatus: any;

  constructor(private service: FlightStatusService) { }

  ngOnInit(): void {
    this.service.find(new Date(), 'LA2012').subscribe(response => this.fligthStatus = response);
  }
}
