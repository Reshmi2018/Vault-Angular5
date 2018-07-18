import { Component, OnInit } from '@angular/core';
import { SecurityService } from './../security.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question:any;
  constructor(private security: SecurityService) { }

  ngOnInit() {
    this.security.getQuestion()
      .subscribe(data => {
        this.question = data;
        console.log('data', this.question);
      });
  }

}
