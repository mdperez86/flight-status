import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

const fakeResponse = {
  'flight': 'LA600',
  'date': '2018-05-18T00:00:00.000Z',
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule.withServerTransition({ appId: 'flight-status' }),
        NoopAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatSnackBarModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should set step to 2 when the date it is set', () => {
    app.ngOnInit();
    app.form.get('date').setValue(new Date());

    expect(app.step).toEqual(2);
  });
  it('should set response in flightStatus property and step to 3', () => {
    spyOn((app as any).service, 'find').and.returnValue(of(fakeResponse));

    app.onSubmit();

    expect(app.isLoading).toBeFalsy();
    expect(app.fligthStatus).toEqual(fakeResponse);
    expect(app.step).toEqual(3);
  });
  it('should call snackBar open with the error message on submit error', () => {
    const erroMessage = 'Error';
    const error = new Error(erroMessage);
    spyOn((app as any).service, 'find').and.returnValue(throwError(error));
    spyOn(app.snackBar, 'open');

    app.onSubmit();

    expect(app.snackBar.open).toHaveBeenCalledWith(erroMessage, null, { duration: 5000 });
    expect(app.isLoading).toBeFalsy();
  });
});
