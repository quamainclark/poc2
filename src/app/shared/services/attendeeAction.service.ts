import { Injectable } from '@angular/core';
import { Item } from "../models/item";

@Injectable({ providedIn: "root" })
export class AttendeeActions {
  clickedItem: Item = null;

  setClickedItem (item: Item) {
    this.clickedItem = item;
  }

  getClickedItem () {
    return this.clickedItem;
  }
}