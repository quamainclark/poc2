import { Component, OnInit, ElementRef, Input, ViewChild } from "@angular/core";
import { Item } from "../../shared/models/item";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { IsShownItemService } from "../../shared/services/isShownItem.service";
import { GetItemsService } from "../../shared/services/getItems.service";
import { MyCartItem } from "../../shared/models/myCartItem";
import { HttpClient } from "@angular/common/http";
import $ from "jquery";
import { AttendeeActions } from "../../shared/services/attendeeAction.service";
import { ContactInfo } from "../../shared/models/contactInfo";
import { PaymentInfo } from "../../shared/models/paymentInfo";

@Component({
  selector: "app-cart",
  templateUrl: "./appCart.component.html",
  styleUrls: ["./appCart.component.css"]
})
export class AppCartComponent implements OnInit {
  @Input() items: Array<Item>;
  @ViewChild("showCartElement") showCartElement: ElementRef;

  isCartShowed: boolean;
  searched_items: Array<Item>;
  search_word: string;
  searchWordUpdate = new Subject<string>();
  height: number;
  isItemShown: object = { key: "value" };
  http: HttpClient;
  attendeeStep: number = 0;
  clickedItem: Item = null;
  isBack: boolean = false;
  myCart: Array<MyCartItem> = [];
  totalQuantity: number = 0;
  contactInfo: ContactInfo;
  billing_address: ContactInfo;
  shipping_address: ContactInfo;
  payment_info: PaymentInfo;

  constructor(
    public isShownItemService: IsShownItemService,
    public getItemsService: GetItemsService,
    public attendeeAction: AttendeeActions
  ) {
    this.searchWordUpdate
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.search_word = value;
        if (this.items && this.items.length > 0) {
          this.searched_items = this.items.filter(item =>
            item.name
              .toLocaleLowerCase()
              .includes(this.search_word.toLocaleLowerCase())
          );
        }
      });
  }

  ngOnInit() {
    this.isCartShowed = true;
    this.search_word = "";

    this.isShownItemService.init(this.items);
    this.searched_items = this.items;
    this.totalQuantity = 0;

    this.contactInfo = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    };

    this.billing_address = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    };

    this.shipping_address = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    };

    this.payment_info = {
      cardNumber: "",
      firstname: "",
      lastname: "",
      expireDate: "",
      securityCode: ""
    };
  }

  ngOnChanges() {
    console.log("change???? ", this.items);
  }

  onShift(): void {
    this.isCartShowed = !this.isCartShowed;
  }

  onClickAttendeeItem(): void {
    this.clickedItem = this.attendeeAction.getClickedItem();
    this.attendeeStep = 1;
    this.isBack = false;

    const description =
      this.clickedItem.content[25] +
      this.clickedItem.content[26] +
      this.clickedItem.content[27] +
      this.clickedItem.content[28];

    const content =
      this.clickedItem.content[21] +
      this.clickedItem.content[22] +
      this.clickedItem.content[23] +
      this.clickedItem.content[24];

    const detailElement = document.getElementById("item-detail-list");
    const descriptionElement = document.getElementById(
      "item-detail-description"
    );
    detailElement.innerHTML = content;
    descriptionElement.innerHTML = description;

    this.totalQuantity = 0;

    this.myCart.map((item, index) => {
      if (item.id === this.clickedItem.id) {
        this.totalQuantity = this.myCart[index].quantity;
      }
    });
  }

  hostItem(e): void {
    this.isShownItemService.check(e.target.className);
    var self = this;

    $(document).ready(function() {
      self.isShownItemService.setShowed(e.target.className);
      const hideClassName = `.hide__${e.target.className}`;
      const imgSelector = `${hideClassName} .hosted_product`;
      $(hideClassName).removeAttr("style");
      $(hideClassName).css({
        transform: `translate(${e.x - e.offsetX}px, ${e.y - e.offsetY}px)`
      });
      $(imgSelector).attr("src", e.target.src);
    });
  }

  removeAllContents(): void {
    const detailElement = document.getElementById("item-detail-list");
    const descriptionElement = document.getElementById(
      "item-detail-description"
    );
    detailElement.innerHTML = "";
    descriptionElement.innerHTML = "";
  }

  increaseQuantity(clickedItem: Item): void {
    let isExisted: boolean = false;

    this.myCart.map((item, index) => {
      if (item.id === clickedItem.id) {
        this.myCart[index].quantity++;
        this.totalQuantity = this.myCart[index].quantity;
        isExisted = true;
      }
    });

    if (!isExisted) {
      const newItem: MyCartItem = {
        id: clickedItem.id,
        name: clickedItem.name,
        url: clickedItem.url,
        price: clickedItem.price,
        quantity: 1
      };
      this.totalQuantity = 1;
      this.myCart.push(newItem);
    }
  }

  decreaseQuantity(clickedItem: Item): void {
    this.myCart.map((item, index) => {
      if (item.id === clickedItem.id) {
        this.myCart[index].quantity--;
        this.totalQuantity = this.myCart[index].quantity;
        if (!this.myCart[index].quantity) {
          this.myCart.splice(index, 1);
        }
      }
    });
  }

  showCart(e): void {
    this.removeAllContents();
    this.attendeeStep++;
  }

  gotoCart(): void {
    this.attendeeStep = 2;
  }

  gotoFirstStep(): void {
    this.attendeeStep = 0;
  }

  gotoNextStep(): void {
    this.attendeeStep++;
  }

  backState(): void {
    this.attendeeStep = this.attendeeStep - 1;
    this.isBack = this.attendeeStep === 0 ? true : false;
    this.removeAllContents();
  }

  backState_contactInfo($contactData: ContactInfo): void {
    this.attendeeStep = this.attendeeStep - 1;
    this.isBack = this.attendeeStep === 0 ? true : false;
    this.removeAllContents();
    this.contactInfo = $contactData;
  }

  gotoNextStep_contactInfo($contactData: ContactInfo): void {
    this.attendeeStep++;
    this.contactInfo = $contactData;
  }

  backState_bill($billData: ContactInfo): void {
    this.attendeeStep = this.attendeeStep - 1;
    this.isBack = this.attendeeStep === 0 ? true : false;
    this.removeAllContents();
    this.billing_address = $billData;
  }

  gotoNextStep_bill($billData: ContactInfo): void {
    this.attendeeStep++;
    this.billing_address = $billData;
  }

  backState_ship($shipData: ContactInfo): void {
    this.attendeeStep = this.attendeeStep - 1;
    this.isBack = this.attendeeStep === 0 ? true : false;
    this.removeAllContents();
    this.shipping_address = $shipData;
  }

  gotoNextStep_ship($shipData: ContactInfo): void {
    this.attendeeStep++;
    this.shipping_address = $shipData;
  }

  backState_payment($paymentData: PaymentInfo): void {
    this.attendeeStep = this.attendeeStep - 1;
    this.isBack = this.attendeeStep === 0 ? true : false;
    this.removeAllContents();
    this.payment_info = $paymentData;
  }

  gotoNextStep_payment($contactData: PaymentInfo): void {
    this.attendeeStep++;
    this.payment_info = $contactData;
  }
}
