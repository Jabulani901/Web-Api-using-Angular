import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/service/country.service';
import { country} from 'src/app/model/country';
import { sport } from 'src/app/model/sport';
import { SportService } from 'src/app/service/sport.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
country : country[];
Sports : sport[];
sportId:number;
isSelected:boolean=false;
  constructor(private _httpService : CountryService, private sportserv : SportService) { }

  ngOnInit() {
    this.getSport();
    this.getAllCountries();
  }
  removeCountry(country):void{
    this._httpService.DeleteCountry(country).subscribe(country=>{this.ngOnInit()});
    }
  getAllCountries()
  {
  this._httpService.getCountry().subscribe(
  country=>{
  this.country = country;
  console.log(country);
  });
  }
  AddCountry(countryName:string,sportId)
  { 
  console.log(sportId);
  var newCountry : country ={countryId:0, CountryName:countryName,sportId:sportId, sportName: ''}
  console.log(newCountry);
  this._httpService.saveCountry((newCountry) as country).subscribe(
  (country) =>{ this.ngOnInit();
  }
  );
  }
GetSportId(country)
{
this.sportId = country;
console.log(country);
return country ;
}
getSport(): void 
{
  this.sportserv.getAllSport().subscribe(values => this.Sports = values);
}
editCountry(country :country,Name:string) :void{
  console.log(country);

country.CountryName = Name;
     
    this._httpService.editCount((country) as country).subscribe(country=>{this.ngOnInit()});
     
    }​
}

