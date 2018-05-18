import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightStatusService } from './flight-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  fligthStatus: any;
  step = 1;
  minDate = new Date();

  constructor(private service: FlightStatusService) {
    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
      flight: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.form.get('date').valueChanges.subscribe(value => {
      this.step = 2;
    });
  }

  onSubmit(): void {
    this.service.find(this.form.value.date, this.form.value.flight).subscribe(response => {
      this.fligthStatus = response;
      this.step = 3;
    });
  }
}
