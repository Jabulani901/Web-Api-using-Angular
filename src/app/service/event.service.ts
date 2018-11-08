import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { events } from '../model/events';
import { tournament } from '../model/tournament';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  
@Injectable({
  providedIn: 'root'
})
export class EventService {
  event :events[];
  tournament : tournament[];
  constructor(private http : HttpClient) { }

  getEvent():Observable<events[]>{
    return this.http.get<events[]>('https://localhost:44338/api/event');
  }
  deleteEv(event: events| number): Observable<events[]>
  {
    const id = typeof event === 'number' ? event : event.eventId;
    console.log(id);
    return this.http.delete<events[]>('https://localhost:44338/api/event' + `/${id}`, httpOptions);
  }
  saveEv(event:events) : Observable < events >{
    return this.http.post<events>('https://localhost:44338/api/event',event, httpOptions);
  }
  editEv(event: events): Observable<events[]>
  {
    console.log(event);
    return this.http.put<events[]>('https://localhost:44338/api/event'+ `/${event.eventId}`, event, httpOptions);
  }
}

