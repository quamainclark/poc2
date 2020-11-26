import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AttendeeStepService {
  step: number = 0;

  stepValueChange: Subject<number> = new Subject<number>();

  constructor() {
    this.stepValueChange.subscribe(value => {
      this.step = value;
    });
  }

  getAtttendeeStep(): number {
    return this.step;
  }

  goToList() {
    this.step = 0;
  }

  goToDetailShow() {
    this.step = 1;
  }

  goToCart() {
    this.step = 2;
  }

  goToContactInfo() {
    this.step = 3;
  }

  goToShippingInfo() {
    this.step = 4;
  }

  goToBillingInfo() {
    this.step = 5;
  }

  goToPaymentInfo() {
    this.step = 6;
  }

  goToOrderSummary() {
    this.step = 7;
  }
}
