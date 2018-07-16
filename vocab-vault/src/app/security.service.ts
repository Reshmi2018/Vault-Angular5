import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SecurityService {
  private questions;
  private qID: number;
  constructor(private http: Http) {
    this.qID = 0;
    this.loadQuestions().subscribe(data => this.questions = data, error => console.log(error));
  }

  getQuestion(): any {
    return {
      qid: this.questions[this.qID].qid,
      text: this.questions[this.qID].text,
      options: this.questions[this.qID].options
    };
  }

  private loadQuestions(): Observable<any> {
    return this.http.get("/assets/data/questions.json")
      .pipe(
        map((res: any) => res.json()),
        catchError(error => of(`Bad Promise: ${error}`))
      );
  }

  next(): any {
    this.qID++;
    return this;
  }

}
