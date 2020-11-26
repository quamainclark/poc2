import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { MyCartItem } from "../../shared/models/myCartItem";
import { ContactInfo } from "../../shared/models/contactInfo";
import { CustomerService } from "../../shared/services/customer.service";

@Component({
  selector: "contact-info",
  templateUrl: "./contactInfo.component.html",
  styleUrls: ["./contactInfo.component.css"]
})
export class ContactInfoComponent implements OnInit {
  @Input() attendeeStep: number;
  @Input() contactInfo: ContactInfo;
  @Input() myCart: Array<MyCartItem>;
  @Output() gotoBackStep = new EventEmitter<ContactInfo>();
  @Output() gotoNextStep = new EventEmitter<ContactInfo>();
  isRequired: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  backState() {
    this.gotoBackStep.emit(this.contactInfo);
  }

  changeValue = (e, fieled): void => {
    this.contactInfo[fieled] = e.target.value;
    this.checkAllInputs();
  };

  checkAllInputs() {
    if (
      !this.contactInfo.firstname ||
      !this.contactInfo.lastname ||
      !this.contactInfo.email ||
      !this.contactInfo.address1 ||
      !this.contactInfo.city ||
      !this.contactInfo.state ||
      !this.contactInfo.zip ||
      !this.contactInfo.country
    ) {
      this.isRequired = true;
    } else {
      this.isRequired = false;
    }
  }

  nextStep() {
    this.checkAllInputs();
    if (this.isRequired) return;
    this.gotoNextStep.emit(this.contactInfo);

    this.customerService.createNewCustomer(this.contactInfo, this.myCart);
  }
}
