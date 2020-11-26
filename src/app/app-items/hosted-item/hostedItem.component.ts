import { Component, Input, OnInit } from "@angular/core";
import { HostedItem } from "../../shared/models/hostedItem";
import { HostingService } from "../../shared/services/hosting.service";
import $ from "jquery";

import { Item } from "../../shared/models/item";
/**
 * @title Basic Drag&Drop
 */
@Component({
  selector: "hosted-product",
  templateUrl: "./hostedItem.component.html",
  styleUrls: ["./hostedItem.component.css"]
})
export class HostedItemComponent implements OnInit {
  hostedItem: HostedItem;
  @Input() child_class: string;
  @Input() items: Array<Item>;

  className: string;
  constructor(public hostingService: HostingService) {}

  ngOnInit() {
    const hideClassName = `hide__${this.child_class}`;
    this.child_class = `hostedItem ${hideClassName}`;
    var self = this;
    $(document).ready(function() {
      $("img").mouseup(function(e) {
        const screenX = $(".app-cart").position().left;
        if (
          e.target.offsetParent &&
          e.target.offsetParent.className.split(" ")[1] ==
            `cdk-drag ${self.child_class}`.split(" ")[2]
        ) {
          if (e.originalEvent.x < screenX) {
            const item_id = self.child_class.split("__")[1];
            const hostedItem = self.items.filter(
              item => item.id === item_id
            )[0];
            console.log("hosting....", self.items, hostedItem);
            self.hostingService.insertToHosting(hostedItem);
          } else {
            const hideClassName = `.${self.child_class.split(" ")[1]}`;
            $(hideClassName).attr("style", "display: none");
          }
        }
      });
    });
  }
}
