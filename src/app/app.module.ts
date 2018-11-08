import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneComponent } from './component/phone/phone.component';
import { HomeComponent } from './component/home/home.component';
import { SportComponent } from './component/sport/sport.component';
import { CountryComponent } from './component/country/country.component';
import { EventComponent } from './component/event/event.component';
import { HttpClientModule } from '@angular/common/http';
import { TournamentComponent } from './component/tournament/tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneComponent,
    HomeComponent,
    SportComponent,
    CountryComponent,
    EventComponent,
    TournamentComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
