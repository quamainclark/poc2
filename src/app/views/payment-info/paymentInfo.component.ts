import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PaymentInfo } from "../../shared/models/paymentInfo";
import { CustomerService } from "../../shared/services/customer.service";

@Component({
  selector: "payment-info",
  templateUrl: "./paymentInfo.component.html",
  styleUrls: ["./paymentInfo.component.css"]
})
export class PaymentInfoComponent implements OnInit {
  @Input() attendeeStep: number;
  @Input() paymentInfo: PaymentInfo;
  @Output() gotoBackStep = new EventEmitter<PaymentInfo>();
  @Output() gotoNextStep = new EventEmitter<PaymentInfo>();
  isRequired: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  backState() {
    this.gotoBackStep.emit(this.paymentInfo);
  }

  changeValue = (e, fieled): void => {
    this.paymentInfo[fieled] = e.target.value;
    this.checkAllInputs();
  };

  checkAllInputs() {
    if (
      !this.paymentInfo.firstname ||
      !this.paymentInfo.lastname ||
      !this.paymentInfo.securityCode ||
      !this.paymentInfo.expireDate ||
      !this.paymentInfo.cardNumber
    ) {
      this.isRequired = true;
    } else {
      this.isRequired = false;
    }
  }

  nextStep() {
    this.checkAllInputs();
    if (this.isRequired) return;
    this.gotoNextStep.emit(this.paymentInfo);

    this.customerService.setPaymentInfo(this.paymentInfo);
  }
}
