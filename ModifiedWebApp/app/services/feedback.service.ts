import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  constructor(private http: HttpClient,
      private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

}

