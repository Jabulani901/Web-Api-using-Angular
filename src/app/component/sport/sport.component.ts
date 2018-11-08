import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/service/sport.service';
import { sport } from 'src/app/model/sport';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
values : sport[];

  constructor(private _httpService : SportService) { }

  ngOnInit() {
  this.getSport();
  }
  getSport()
  {
    this._httpService.getAllSport().subscribe(values => 
      {
        this.values = values
      }
      );
  }

  saveSport(sportName: string): void {
    
    var sportAdd: sport = { sportId: 0, sportName: sportName};
    this._httpService.addSport((sportAdd) as sport).subscribe(Sports =>{this.ngOnInit();}​);
    
  }
removeSport(sport):void{
  this._httpService.DeleteSport(sport).subscribe(sport=>{this.ngOnInit()});
  }

editSports(sport :sport,sportName:string) :void{
  console.log(sport)
    sport.sportName=sportName;
     
    this._httpService.editSport((sport) as sport).subscribe(sport=>{this.ngOnInit()});
     
    }​
}
