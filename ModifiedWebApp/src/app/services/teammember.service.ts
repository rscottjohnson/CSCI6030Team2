import { Injectable } from '@angular/core';
import { Teammember } from '../shared/teammember';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class TeammemberService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  getTeammember(id: string): Observable<Teammember> {
    return this.http.get<Teammember>(baseURL + 'teammembers/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTeammembers(): Observable<Teammember[]> {
    return this.http.get<Teammember[]>(baseURL + 'teammembers')
     .pipe(catchError(this.processHTTPMsgService.handleError)) ;
  }

  getFeaturedTeammember(): Observable<Teammember> {
    return this.http.get<Teammember[]>(baseURL + 'teammembers?featured=true').pipe(map(teammembers => teammembers[1]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTeammemberIds(): Observable<string[] | any> {
    return this.getTeammembers().pipe(map(teammembers => teammembers.map(teammember => teammember.id)))
      .pipe(catchError(error => error));
  }

  putLeader(teammember: Teammember): Observable<Teammember> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Teammember>(baseURL + 'teammembers/' + teammember.id, teammember, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
