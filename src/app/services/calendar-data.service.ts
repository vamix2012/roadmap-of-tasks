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
  /**
   *
   * @param allNotesEndpoint Endpoint used to fetch all Notes from server
   * @returns Http GET request to the Notes Endpoint
   */
  getAllNotes(allNotesEndpoint: string): Observable<any> {
    return this.http.get<any>(allNotesEndpoint);
  }
  /**
   *
   * @param noteLabelsEndpoint Endpoint used to fetch Labels(Departments) from server
   * @returns Http GET request to the Labels Endpoint
   */
  getLabels(noteLabelsEndpoint: string): Observable<any> {
    return this.http.get<any>(noteLabelsEndpoint);
  }

  /**
   *
   * @param allNotesEndpoint Endpoint combined with id to save the data on it's id
   * @param updatedNote Updated Object to be saved
   * @param id Id of the object to be concatenated to the notes endpoint
   * @returns Http PUT Request to the notes Endpoint on it's coresponding id
   */

  updateNotes(
    allNotesEndpoint: string,
    updatedNote: Note,
    id: number
  ): Observable<any> {
    return this.http.put(`${allNotesEndpoint}/${id}/`, updatedNote);
  }
}
