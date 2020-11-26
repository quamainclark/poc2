import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })
export class IsShownItemService {
  isItemShown: object = {key: "value"};

  init(items) {
    items.map((item) => {
      this.isItemShown[item.id] = false;
    });
  }

  check(className: string) {
    if(this.isItemShown[className]) return true;
    return false;
  }

  setShowed(className: string) {
    this.isItemShown[className] = true;
  }

  setHide(className: string) {
    this.isItemShown[className] = false;
  }
}