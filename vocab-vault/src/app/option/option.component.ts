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

  constructor(private security: SecurityService) {
    this.question = {};
    this.disableOK = true;
  }

  ngOnInit() {
    this.security.getQuestion()
      .subscribe(data => {
        this.question = data;
        this.selectedOption = undefined;
        this.correctAnswer = undefined;
        this.showAnswer = false;
        console.log('data', this.question);
      });
  }

  setOptionSelected(opt: string): void {
    this.selectedOption = opt;
    this.disableOK = false;
  }

  submitAns(): void {
    this.disableOK = true;
    let correctAns = this.security.validate(this.selectedOption);
    
    if(typeof correctAns === 'string') {
      this.correctAnswer = correctAns; 
      this.showAnswer = true;
    }else if (correctAns === false) {
      setTimeout(() => {
        this.correctAnswer = undefined;
        this.selectedOption = undefined;
      },2000);
    }
  }

}
