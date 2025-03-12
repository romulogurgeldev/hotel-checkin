import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckIn } from '../models/check-in';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  deleteGuest(id: number | undefined) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/checkins';

  constructor(private http: HttpClient) { }

  checkIn(checkIn: CheckIn): Observable<CheckIn> {
    return this.http.post<CheckIn>(this.apiUrl, checkIn);
  }

  getGuestsWhoLeft(): Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.apiUrl}/left`);
  }

  getGuestsStillPresent(): Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(`${this.apiUrl}/present`);
  }
}