import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MyCartItem } from "../models/MyCartItem";
import { ContactInfo } from "../models/contactInfo";

@Injectable({ providedIn: "root" })
export class MyCartService {
  items: Array<MyCartItem> = [];
  contactInfo: ContactInfo;

  constructor() {}

  setItems(items) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  setContactInfo(info) {
    this.contactInfo;
  }

  getContactInfo() {
    return this.contactInfo;
  }
}
