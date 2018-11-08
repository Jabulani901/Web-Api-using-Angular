import { Component, OnInit } from '@angular/core';
import { tournament } from 'src/app/model/tournament';
import { TournamentService } from 'src/app/service/tournament.service';
import { events } from 'src/app/model/events';
import { EventService } from 'src/app/service/event.service';
import { country } from 'src/app/model/country';
import { sport } from 'src/app/model/sport';
import { SportService } from 'src/app/service/sport.service';
import { CountryService } from 'src/app/service/country.service';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  constructor(private event : EventService,private _httpService : TournamentService, private sportserv : SportService, private countryserv: CountryService) { }

  ngOnInit() {
    this.getTournament();
    this.getAllEvents();
    this.getSport();
    this.getAllCountries();
 
  }
  events : events[];
  tournament : tournament[];
  country : country[];
  Sports : sport[];
  SportCountry: country[];
   tournamentCountry: tournament[];
  tId :number;
  sportId:number;
  countryId:number;

  findTournamentID() {
    this.tId = +this.tId;
    console.log(this.tId)
  }
  findSportID() {
    this.sportId = +this.sportId;
    var sportId = this.sportId;
    this.SportCountry = [];
    for (var i = 0; i < this.country.length; i++) {
      if (this.country[i].sportId == sportId) {
        this.SportCountry.push(this.country[i]);
      }
    }
  console.log(this.SportCountry);
  console.log(sportId);
  }
  findCountryTournamentID() {
    this.countryId = +this.countryId;
    var countryId = this.countryId;
    this.tournamentCountry = [];
    for (var i = 0; i < this.tournament.length; i++) {
      if (this.tournament[i].countryId == countryId) {
        this.tournamentCountry.push(this.tournament[i]);
      }
    }
  console.log(this.tournamentCountry);
  console.log(countryId);
  }
  getSport(): void 
  {
    this.sportserv.getAllSport().subscribe(values => this.Sports = values);
  }
  getAllCountries()
  {
  this._httpService.getCountry().subscribe(
  country=>{
  this.country = country;
  console.log(country);
  });
  }
  findCountryID() {
    this.countryId = +this.countryId;
    console.log(this.countryId)
  }
  getTournament()
  {
  this._httpService.getAllTournament().subscribe(
  tournament=>{
  this.tournament = tournament;
  console.log(tournament);
  });
  }
  getAllEvents()
  {
  this.event.getEvent().subscribe(
  events=>{
  this.events = events;
  console.log(events);
  });
  }
  addEvent(eventName: string, tId: number,dateH : Date): void {
    if (!eventName || tId == undefined || !dateH) { return; }
    this.event.saveEv({ eventName,tId,dateH } as events).subscribe((event: events) => {
      this.events.push(event);
    }, (error: any) => {
      
    });
  }
  deleteEvent(event: events): void {
    if (!event) { return; }
    if (confirm("Are You Sure You Want To Delete " + event.eventName)) {
      this.event.deleteEv(event).subscribe((event: events[]) => {
        this.events = (event);
      }, (error: any) => {

      });
    }
  }
  editEvent(eventName: string, eventId: number , dateH: Date): void {
    if (!eventName) { return; }
    this.event.editEv({ eventId, eventName,dateH } as events).subscribe((event: events[]) => {
      this.events = (event);
    }, (error: any) => {

    });
  }
}

