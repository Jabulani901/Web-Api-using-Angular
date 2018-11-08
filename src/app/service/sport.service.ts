import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sport } from '../model/sport';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

@Injectable({
  providedIn: 'root'
})
export class SportService {
  sport:sport[];
  sportUrl: string = 'https://localhost:44338/api/sport';

  constructor(private http: HttpClient) { }

  getAllSport():Observable<sport[]>{
    return this.http.get<sport[]>('https://localhost:44338/api/sport');
  }

  addSport(sport:sport) : Observable < sport >{
    return this.http.post<sport>(this.sportUrl, sport, httpOptions);
  }
  DeleteSport(sport:sport):Observable<sport>{
    console.log(sport);
    const id = `https://localhost:44338/api/sport/${sport.sportId}`;
     
    return this.http.delete<sport>(id,httpOptions);
    
    }
    editSport(sport:sport): Observable<sport>{
      console.log(sport);
      const id = `https://localhost:44338/api/sport/${sport.sportId}`;
      return this.http.put<sport>(id, sport, httpOptions);
      }​
}
