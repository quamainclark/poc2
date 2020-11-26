import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './appTime.component.html',
  styleUrls: ['./appTime.component.css' ]
})

export class AppTimeComponent implements OnInit {
  hour: number;
  minute: number;
  second: number;
  count: number;
  timerNumbers: Observable<number>;
  
  constructor() {
    this.timerNumbers = timer(1000, 1000);
    this.timerNumbers.subscribe(() => {
      this.count ++;
      this.toConvertString();
    });
  }

  ngOnInit() {
    this.count = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
  }

  toConvertString() {
    this.second ++;
    if(this.count % 60 === 0) {
      this.minute ++;
      this.second = 0;
    }

    if(this.count % 3600 === 0) {
      this.minute = 0;
      this.hour ++;
    }
  }
}