import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarDataService {
  allNotesEndpoint: string =
    'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api/notes';

  noteLabelsEndpoint: string =
    'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api/noteLabels';

  constructor(private http: HttpClient) {}

  getAllNotes(allNotesEndpoint: string): Observable<any> {
    return this.http.get<any>(allNotesEndpoint);
  }

  getLabels(noteLabelsEndpoint: string): Observable<any> {
    return this.http.get<any>(noteLabelsEndpoint);
  }

  updateNotes(
    allNotesEndpoint: string,
    updatedNote: Note,
    id: number
  ): Observable<any> {
    return this.http.put(allNotesEndpoint + '/' + id + '/', updatedNote);
  }
}
