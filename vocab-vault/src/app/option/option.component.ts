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

  constructor(private security: SecurityService) {
    this.question = {};
  }

  ngOnInit() {
    this.security.getQuestion()
      .subscribe(data => {
        this.question = data;
        console.log('data', this.question);
      });
  }

  setOptionSelected(opt: string): void {
    this.selectedOption = opt;
  }

  submitAns(): void {
    let isValid = this.security.validate(this.selectedOption);
    this.selectedOption = undefined; 
    if(isValid) {

    }
  }

}
