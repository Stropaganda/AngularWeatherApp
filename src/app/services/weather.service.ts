import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherUrl: string = 'https://api.openweathermap.org/data/2.5';
  geoUrl = 'https://api.openweathermap.org/geo/1.0';
  apiKey = 'e20303d1c0f6a48745cf69dbdd8104ab';
  units = "imperial";

  constructor(
    private http: HttpClient
  ) { }

  getLocation(zip: string): Observable<any> {
    return this.http.get<any>(`${this.geoUrl}/zip?zip=${zip}&APPID=${this.apiKey}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getWeather(lat: number, lon: number, name: string, isUpdating: boolean): Observable<any> {
    return this.http.get<any>(`${this.weatherUrl}/onecall?lat=${lat}&lon=${lon}&units=${this.units}&APPID=${this.apiKey}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
