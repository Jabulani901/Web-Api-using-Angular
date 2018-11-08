import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneComponent } from './component/phone/phone.component';
import { HomeComponent } from './component/home/home.component';
import { SportComponent } from './component/sport/sport.component';
import { CountryComponent } from './component/country/country.component';
import { EventComponent } from './component/event/event.component';
import { TournamentComponent } from './component/tournament/tournament.component';

const routes: Routes = [
  {path:'phone',component:PhoneComponent},
  {path:'home',component:HomeComponent},
  {path:'sport',component:SportComponent},
  {path:'country',component:CountryComponent},
  {path:'tournament',component:TournamentComponent},
  {path:'event',component:EventComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
