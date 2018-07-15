import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

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
    return this.http.get("./data/questions.json")
                    .map((res:any) => res.json())
                    .catch((error:any) => console.log(error));

}

  next(): any {
    this.qID++;
    return this;
  }

}
