import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Item } from "../models/item";
import { url } from "../models/url";

@Injectable({ providedIn: "root" })
export class HostingService {
  hostingItems: Array<Item> = [];
  result: Item;
  constructor(private http: HttpClient) {}

  insertToHosting(item: Item) {
    if (this.hostingItems.filter(v => v === item).length) return;
    this.hostingItems.push(item);
  }

  removeDoubles() {
    const realItems: Array<Item> = [];

    for (let i = 0; i < this.hostingItems.length; i++) {
      let isDouble = false;
      for (let j = i + 1; j < this.hostingItems.length; j++) {
        if (this.hostingItems[i] === this.hostingItems[j]) {
          isDouble = true;
          break;
        }
      }
      if (!isDouble) realItems.push(this.hostingItems[i]);
    }
    console.log("---------------");
    console.log(this.hostingItems);
    console.log("---------------");
    console.log(realItems);
    console.log("---------------");
    this.hostingItems = realItems;
  }

  hostItems() {
    this.removeDoubles();

    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };

    return this.http
      .post<any>(`${url}/todos`, this.hostingItems, options)
      .subscribe(data => {
        console.log("hosting .... ", data);
      });
  }

  getHostedItems() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };

    return this.http.get<any>(`${url}/todos`, options).subscribe(data => {
      console.log("Pulled hosted Data ... ", data);
    });
  }
}
