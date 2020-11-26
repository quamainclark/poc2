import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MyCartItem } from "../../shared/models/myCartItem";
import { OrderDetail } from "../../shared/models/orderDetail";
import { ContactInfo } from "../../shared/models/contactInfo";
import { CustomerService } from "../../shared/services/customer.service";

@Component({
  selector: "review-order",
  templateUrl: "./reviewOrder.component.html",
  styleUrls: ["./reviewOrder.component.css"]
})
export class ReviewOrderComponent implements OnInit {
  @Input() attendeeStep: number;
  @Input() myCart: Array<MyCartItem>;
  @Output() gotoBackStep = new EventEmitter<number>();
  @Output() gotoNextStep = new EventEmitter<number>();
  subtotalPrice: number = 0;
  orderDetail: OrderDetail = null;
  shippingAddress: ContactInfo = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    console.log(this.myCart);
    this.myCart.map(item => {
      this.subtotalPrice += Number(item.price) * item.quantity;
    });

    this.orderDetail = this.customerService.getOrderDetail();
    this.shippingAddress = this.customerService.getShippingAddress();
  }

  backState() {
    this.gotoBackStep.emit(6);
  }

  nextStep() {
    this.customerService.createCreditCardPayment();
  }

  OnChanges() {
    console.log(this.myCart);
  }
}
