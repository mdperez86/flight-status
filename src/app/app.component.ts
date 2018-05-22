import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FlightStatusService } from './flight-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  fligthStatus: any;
  minDate = new Date();
  step = 1;

  constructor(private service: FlightStatusService, public snackBar: MatSnackBar) {
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
    this.isLoading = true;
    this.service.find(this.form.value.date, this.form.value.flight).subscribe(response => {
      this.fligthStatus = response;
      this.isLoading = false;
      this.step = 3;
    }, (error: Error) => {
      this.snackBar.open(error.message, null, { duration: 5000 });
      this.isLoading = false;
    });
  }
}
