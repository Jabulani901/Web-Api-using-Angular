import { Component, OnInit } from '@angular/core';
import { country } from 'src/app/model/country';
import { sport } from 'src/app/model/sport';
import { tournament } from 'src/app/model/tournament';
import { CountryService } from 'src/app/service/country.service';
import { SportService } from 'src/app/service/sport.service';
import { TournamentService } from 'src/app/service/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  tournament : tournament[];
  country : country[];
  Sports : sport[];
  SportCountry: country[];
  countryId:number;
  sportId:number;
  constructor(private _httpService : TournamentService, private sportserv : SportService, private countryserv: CountryService) { }

  ngOnInit() {
    this.getSport();
    this.getAllCountries();
    this.getTournament();
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
  findCountryID() {
    this.countryId = +this.countryId;
    console.log(this.countryId)
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
  getTournament()
  {
  this._httpService.getAllTournament().subscribe(
  tournament=>{
  this.tournament = tournament;
  console.log(tournament);
  });
  }
  addTournament(tName: string, countryId: number): void {
    if (!tName || countryId == undefined) { return; }
    this._httpService.saveTournament({ tName,countryId } as tournament).subscribe((tour: tournament) => {
      this.tournament.push(tour)
    }, (error: any) => {

    });
  }
  deleteTour(tour: tournament): void {
    if (!tour) { return; }
    if (confirm("Are You Sure You Want To Delete " + tour.tName)) {
      this._httpService.deleteTournament(tour).subscribe((tour: tournament[]) => {
        this.tournament = (tour)
      }, (error: any) => {
      });
    }
  }
  editTour(tName: string, tId: number): void {
    if (!tName) { return; }
    this._httpService.editTournament({ tId, tName } as tournament).subscribe((tournament: tournament[]) => {
      this.tournament = (tournament)
    }, (error: any) => {

    });
  }
}
