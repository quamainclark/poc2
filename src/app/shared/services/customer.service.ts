import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServerItem } from "../models/serverItem";
import { catchError, map, tap } from "rxjs/operators";
import { Item } from "../models/item";
import { url } from "../models/url";
import { ContactInfo } from "../models/contactInfo";
import { PaymentInfo } from "../models/paymentInfo";
import { CustomerResponse } from "../models/customerResponse";
import { OrderDetail } from "../models/orderDetail";
import { MyCartItem } from "../models/myCartItem";

@Injectable({ providedIn: "root" })
export class CustomerService {
  contactInfo: ContactInfo;
  billingAddress: ContactInfo;
  shippingAddress: ContactInfo;
  paymentInfo: PaymentInfo;

  customerId: number;
  orderDetail: OrderDetail;
  myCart: Array<MyCartItem>;
  paymentId: number;

  constructor(private http: HttpClient) {}

  createNewCustomer(customerInfo: ContactInfo, myCart: Array<MyCartItem>): any {
    this.contactInfo = customerInfo;
    this.myCart = myCart;

    return this.http
      .post<any>(`${url}/todos/createCustomer`, customerInfo)
      .subscribe(data => {
        this.customerId = data.customerID;
      });
  }

  createOrder(shippingAddress: ContactInfo): any {
    this.shippingAddress = shippingAddress;
    const {
      firstname,
      lastname,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      country
    } = this.shippingAddress;

    let items = [];
    this.myCart.map(item => {
      items.push({
        ItemCode: item.id,
        Quantity: item.quantity
      });
    });

    const orderInfo = {
      customerID: this.customerId,
      orderStatus: null,
      orderDate: "2020-12-04T00:00:00-06:00",
      currencyCode: "USD",
      warehouseID: 2,
      shipMethodID: 1,
      priceType: 1,
      firstName: firstname,
      lastName: lastname,
      company: "",
      address1: address1,
      address2: address2,
      address3: "",
      city: city,
      state: state,
      zip: zip,
      country: country,
      county: "",
      email: email,
      phone: phone,
      notes: "",
      other11: "",
      other12: "",
      other13: "",
      other14: "",
      other15: "",
      other16: "",
      other17: "",
      other18: "",
      other19: "",
      other20: "",
      orderType: "",
      transferVolumeToID: 1,
      returnOrderID: null,
      overwriteExistingOrder: true,
      existingOrderID: null,
      partyID: null,
      details: items,
      suppressPackSlipPrice: true,
      transferVolumeToKey: "",
      returnOrderKey: "",
      existingOrderKey: ""
    };

    return this.http
      .post<any>(`${url}/todos/createOrder`, JSON.stringify(orderInfo))
      .subscribe(data => {
        console.log("Order Result ____> ", data);
        this.orderDetail = data;
      });
  }

  getOrderDetail(): OrderDetail {
    return this.orderDetail;
  }

  getShippingAddress(): ContactInfo {
    return this.shippingAddress;
  }

  setBillingAddress(billingAddress: ContactInfo) {
    this.billingAddress = billingAddress;
  }

  setPaymentInfo(paymentInfo: PaymentInfo) {
    this.paymentInfo = paymentInfo;
  }

  createCreditCardPayment() {
    return this.http
      .post<any>(
        `${url}/todos/createCreditCardPayment`,
        JSON.stringify({
          orderID: this.orderDetail.orderID,
          amount: this.orderDetail.total,
          paymentInfo: this.paymentInfo,
          billingAddress: this.billingAddress
        })
      )
      .subscribe(data => {
        console.log("Payment Result_____>", data);
        this.paymentId = data;
      });
  }
}
