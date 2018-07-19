import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of, Subject, observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SecurityService {
  private questions;
  private qID: number;
  private groupIndex: number;
  private questionSubject$: Subject<any>;
  private unlockSubject$: Subject<any>;

  constructor(private http: Http) {
    this.qID = 0;
    this.groupIndex = 0;
    this.questionSubject$ = new Subject();
    this.unlockSubject$ = new Subject(); 
    this.loadQuestions().subscribe(data => {
      this.questions = data;
      this.sendNext();
    },
      error => console.log(error));
  }

  getQuestion(): Subject<any> {
    return this.questionSubject$;
  }

  unlockVault(): Subject<any> {
    return this.unlockSubject$;
  }

  validate(ans) {
    var isCorrect = this.questions[this.groupIndex][this.qID].answer === ans;
    this.questions[this.groupIndex][this.qID].correctAnswered = isCorrect; 
    this.questions[this.groupIndex][this.qID].try++; 
    if(isCorrect) {
      setTimeout(() =>{
        this.processNextQuestion(); 
      },2000);
      this.unlockSubject$.next(); 
      return true;
    }else if(!isCorrect && this.questions[this.groupIndex][this.qID].try === 2) {
      setTimeout(() =>{
        this.processNextQuestion(); 
      },2000);
      return  this.questions[this.groupIndex][this.qID].answer; 
    }
    return  false;
  }

  processNextQuestion() {
    if (this.groupIndex >= this.questions.length) {
      return false;
    } else {
      let groupCleared = true;
      this.qID++;
      for (let i = 0; i < this.questions[this.groupIndex].length; i++,this.qID++ ) {
        this.qID = this.qID % this.questions[this.groupIndex].length;
        if (!this.questions[this.groupIndex][this.qID].correctAnswered) {
          groupCleared = false;
          this.sendNext();
          break;
        }
      }
      if (groupCleared && this.groupIndex + 1 < this.questions.length) {
        this.qID = 0;
        this.groupIndex++;
        this.processNextQuestion();
      } else {
        return false;
      }
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
    this.questions[this.groupIndex][this.qID].correctAnswered = false; 
    this.questions[this.groupIndex][this.qID].try = 0; 
    this.questionSubject$.next({
      qid: this.questions[this.groupIndex][this.qID].qid,
      text: this.questions[this.groupIndex][this.qID].text,
      options: this.questions[this.groupIndex][this.qID].options,
    });
  }
}
