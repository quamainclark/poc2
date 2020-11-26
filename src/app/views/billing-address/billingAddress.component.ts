import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ContactInfo } from "../../shared/models/contactInfo";
import { CustomerService } from "../../shared/services/customer.service";

@Component({
  selector: "billing-address",
  templateUrl: "./billingAddress.component.html",
  styleUrls: ["./billingAddress.component.css"]
})
export class BillingAddressComponent implements OnInit {
  @Input() attendeeStep: number;
  @Input() billing_address: ContactInfo;
  @Output() gotoBackStep = new EventEmitter<ContactInfo>();
  @Output() gotoNextStep = new EventEmitter<ContactInfo>();
  isRequired: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  backState() {
    this.gotoBackStep.emit(this.billing_address);
  }

  changeValue = (e, fieled): void => {
    this.billing_address[fieled] = e.target.value;
    this.checkAllInputs();
  };

  checkAllInputs() {
    if (
      !this.billing_address.firstname ||
      !this.billing_address.lastname ||
      !this.billing_address.email ||
      !this.billing_address.address1 ||
      !this.billing_address.city ||
      !this.billing_address.state ||
      !this.billing_address.zip ||
      !this.billing_address.country
    ) {
      this.isRequired = true;
    } else {
      this.isRequired = false;
    }
  }

  nextStep() {
    this.checkAllInputs();
    if (this.isRequired) return;
    this.gotoNextStep.emit(this.billing_address);

    this.customerService.setBillingAddress(this.billing_address);
  }
}
