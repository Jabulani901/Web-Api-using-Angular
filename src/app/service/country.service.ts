import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { country } from '../model/country';
import { Observable } from 'rxjs';
import { sport } from '../model/sport';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
@Injectable({
  providedIn: 'root'
})
export class CountryService {
country : country[];
sport:sport[];
  constructor(private http : HttpClient) { }

  getCountry():Observable<country[]>{
    return this.http.get<country[]>('https://localhost:44338/api/country');
  }
  saveCountry(country:country) : Observable < country >{
    return this.http.post<country>('https://localhost:44338/api/country', country, httpOptions);
  }
  getSport():Observable<sport[]>{
    return this.http.get<sport[]>('https://localhost:44338/api/sport');
  }
  DeleteCountry(country:country):Observable<country>{
    console.log(country);
    const id = `https://localhost:44338/api/country/${country.countryId}`;
     
    return this.http.delete<country>(id,httpOptions);
    
    }
    editCount(country:country): Observable<country>{
      console.log(country);
      const id = `https://localhost:44338/api/country/${country.countryId}`;
      return this.http.put<country>(id, country, httpOptions);
      }​
}
