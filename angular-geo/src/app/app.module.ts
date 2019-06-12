import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { SummaryComponent } from './components/summary/summary.component';
import { AgmCoreModule } from '@agm/core';
import { DetailsComponent } from './components/details/details.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule.forRoot(environment.googleMapsKey),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
