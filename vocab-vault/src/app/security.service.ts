import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of, Subject, observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SecurityService {
  private questions;
  private qID: number;
  private questionSubject$: Subject<any>;

  constructor(private http: Http) {
    this.qID = 0;
    this.questionSubject$ = new Subject();
    this.loadQuestions().subscribe(data => {
      this.questions = data;
      this.sendNext();
    },
      error => console.log(error));
  }

  getQuestion(): Subject<any> {
    return this.questionSubject$;
  }

  validate(ans) {
    debugger;
    if (this.questions[this.qID-1].answer === ans) {
      this.processNextQuestion(); 
      return true;
    } else {
      return false;
    }
  }

  processNextQuestion(){
    if(this.questions.length === this.qID) {
      return false; 
    }else {
      this.sendNext();
    }
  }

  private loadQuestions(): Observable<any> {
    return this.http.get("/assets/data/questions.json")
      .pipe(
        map((res: any) => res.json()),
        catchError(error => of(`Bad Promise: ${error}`))
      );
  }

  private sendNext(): void {
    this.questionSubject$.next({
      qid: this.questions[this.qID].qid,
      text: this.questions[this.qID].text,
      options: this.questions[this.qID].options
    });
    this.qID++;
  }
}
