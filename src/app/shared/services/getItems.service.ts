import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ServerItem } from "../models/serverItem";
import { Item } from "../models/item";
import { url } from "../models/url";

@Injectable({ providedIn: "root" })
export class GetItemsService {
  hostingItems: Array<Item> = [];
  result: Item;
  serverItem: ServerItem;
  constructor(private http: HttpClient) {}

  pullItems(): Observable<ServerItem> {
    return this.http.get<any>(`${url}/todos/1`);
  }

  getItems() {
    return this.serverItem;
  }
}
