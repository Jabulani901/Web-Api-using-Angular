import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tournament } from '../model/tournament';
import { country } from '../model/country';
import { sport } from '../model/sport';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  
@Injectable({
  providedIn: 'root'
})
export class TournamentService {
tournament : tournament[];
country : country[];
sport : sport[];

  constructor(private http : HttpClient) { }
  
  getTournament():Observable<tournament[]>{
    return this.http.get<tournament[]>('https://localhost:44338/api/tournament');
  }
  getAllSport():Observable<sport[]>{
    return this.http.get<sport[]>('https://localhost:44338/api/sport');
  }
  getAllTournament():Observable<tournament[]>{
    return this.http.get<tournament[]>('https://localhost:44338/api/tournament');
  }
  getCountry():Observable<country[]>{
    return this.http.get<country[]>('https://localhost:44338/api/country');
  }
  saveTournament(tournament:tournament) : Observable < tournament >{
    return this.http.post<tournament>('https://localhost:44338/api/tournament', tournament, httpOptions);
  }
  deleteTournament(tour: tournament| number): Observable<tournament[]>
  {
    const id = typeof tour === 'number' ? tour : tour.tId;
    console.log(id);
    return this.http.delete<tournament[]>('https://localhost:44338/api/tournament' + `/${id}`, httpOptions);
  }

  editTournament(tour: tournament): Observable<tournament[]>
  {
    console.log(tour);
    return this.http.put<tournament[]>('https://localhost:44338/api/tournament'+ `/${tour.tId}`, tour, httpOptions);
  }
}
