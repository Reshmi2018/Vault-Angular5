import { Component, OnInit } from '@angular/core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { SecurityService } from './../security.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  faCaretRight = faCaretRight;
  private question: any;
  private selectedOption: string;
  private showAnswer: boolean;
  private correctAnswer: string;
  private disableOK: boolean;
  private endOfQuestion: boolean;

  constructor(private security: SecurityService) {
    this.question = {};
    this.disableOK = true;
    this.endOfQuestion = false;
  }

  ngOnInit() {
    this.security.getQuestion()
      .subscribe(data => {
        this.showAnswer = false;
        console.log('data', data);
        if (!data) {
          this.endOfQuestion = true;
          return; 
        }
        this.question = data;
        this.selectedOption = undefined;
        this.correctAnswer = undefined;
      });
  }

  setOptionSelected(opt: string): void {
    this.selectedOption = opt;
    this.disableOK = this.endOfQuestion;
  }

  submitAns(): void {
    this.disableOK = !this.endOfQuestion;
    let correctAns = this.security.validate(this.selectedOption);

    if (typeof correctAns === 'string') {
      this.correctAnswer = correctAns;
      this.showAnswer = true;
    } else if (correctAns === false) {
      setTimeout(() => {
        this.correctAnswer = undefined;
        this.selectedOption = undefined;
      }, 2000);
    }
  }

}
