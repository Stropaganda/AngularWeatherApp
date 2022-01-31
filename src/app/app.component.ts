import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'AngularWeatherApp';
  weatherReports: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    let weatherReports = this.localStorageService.getData('weatherReports');
    if(weatherReports) {
      this.weatherReports = JSON.parse(weatherReports);
      let promiseArray:Observable<any>[] = [];
      this.weatherReports.forEach((report) => {
        promiseArray.push(this.weatherService.getWeather(report.lat, report.lon, report.name, true));
      });
      Promise.all(promiseArray).then(function(values) {
        console.log(values);
      });
    }

    console.log(this.weatherReports);
  }
}
