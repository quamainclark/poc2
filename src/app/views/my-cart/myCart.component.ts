import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MyCartItem } from "../../shared/models/myCartItem";

@Component({
  selector: "my-cart",
  templateUrl: "./myCart.component.html",
  styleUrls: ["./myCart.component.css"]
})
export class MyCartComponent implements OnInit {
  @Input() attendeeStep: number;
  @Input() myCart: Array<MyCartItem>;
  @Output() gotoFirstStep = new EventEmitter<number>();
  @Output() gotoNextStep = new EventEmitter<number>();
  subtotalPrice: number = 0;

  ngOnInit(): void {
    this.myCart.map(item => {
      this.subtotalPrice += Number(item.price) * item.quantity;
    });
  }

  backState() {
    this.gotoFirstStep.emit(0);
  }

  nextStep() {
    this.gotoNextStep.emit(3);
  }

  onIncrease(item) {
    this.myCart.map((value, index) => {
      if (value.id === item.id) {
        this.myCart[index].quantity++;
      }
    });

    this.subtotalPrice = 0;
    this.myCart.map(item => {
      this.subtotalPrice += Number(item.price) * item.quantity;
    });
  }

  onDecrease(item) {
    this.myCart.map((value, index) => {
      if (value.id === item.id && value.quantity > 0) {
        this.myCart[index].quantity--;
      }
    });

    this.subtotalPrice = 0;
    this.myCart.map(item => {
      this.subtotalPrice += Number(item.price) * item.quantity;
    });
  }

  onDelete(item) {
    let i;
    this.myCart.map((value, index) => {
      if (value.id === item.id) {
        i = index;
      }
    });

    this.myCart.splice(i, 1);

    this.subtotalPrice = 0;
    this.myCart.map(item => {
      this.subtotalPrice += Number(item.price) * item.quantity;
    });
  }

  OnChanges() {
    console.log(this.myCart);
  }
}
