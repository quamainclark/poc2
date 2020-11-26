import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { ContactInfo } from "../../shared/models/contactInfo";
import { CustomerService } from "../../shared/services/customer.service";

@Component({
  selector: "shipping-address",
  templateUrl: "./shippingAddress.component.html",
  styleUrls: ["./shippingAddress.component.css"]
})
export class ShippingAddressComponent implements OnInit {
  @Input() attendeeStep: number;
  @Input() shipping_address: ContactInfo;
  @Output() gotoBackStep = new EventEmitter<ContactInfo>();
  @Output() gotoNextStep = new EventEmitter<ContactInfo>();
  isRequired: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  backState() {
    this.gotoBackStep.emit(this.shipping_address);
  }

  changeValue = (e, fieled): void => {
    this.shipping_address[fieled] = e.target.value;
    this.checkAllInputs();
  };

  checkAllInputs() {
    if (
      !this.shipping_address.firstname ||
      !this.shipping_address.lastname ||
      !this.shipping_address.email ||
      !this.shipping_address.address1 ||
      !this.shipping_address.city ||
      !this.shipping_address.state ||
      !this.shipping_address.zip ||
      !this.shipping_address.country
    ) {
      this.isRequired = true;
    } else {
      this.isRequired = false;
    }
  }

  nextStep() {
    this.checkAllInputs();
    if (this.isRequired) return;
    this.gotoNextStep.emit(this.shipping_address);

    this.customerService.createOrder(this.shipping_address);
  }
}
