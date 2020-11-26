import { Component, Input, OnInit } from "@angular/core";
import { HostedItem } from "../../shared/models/hostedItem";
import { HostingService } from "../../shared/services/hosting.service";
import { AttendeeActions } from "../../shared/services/attendeeAction.service";
import { AttendeeStepService } from "../../shared/services/attendeeStep.service";
import $ from "jquery";

import { Item } from "../../shared/models/item";

/**
 * @title Basic Drag&Drop
 */
@Component({
  selector: "attendee-hosted-product",
  templateUrl: "./attendeeHostedItem.component.html",
  styleUrls: ["./attendeeHostedItem.component.css"]
})
export class AttendeeHostedItemComponent implements OnInit {
  hostedItem: HostedItem;
  @Input() child_class: string;
  @Input() items: Array<Item>;
  url: string = "";
  style: string = "top: 70px; left: 70px;";

  className: string;
  constructor(
    public hostingService: HostingService,
    public attendeeAction: AttendeeActions,
    public attendeeStepService: AttendeeStepService
  ) {}

  ngOnInit() {
    let index: number = 0;
    let attendeeItem: Item = null;
    this.items.map((item, i) => {
      if (item.id === this.child_class) {
        index = i;
        attendeeItem = item;
      }
    });

    this.url = attendeeItem.url;

    const attendeeHostedClassName = `attendee__${this.child_class}`;
    this.child_class = `attendeeHostedItem ${attendeeHostedClassName}`;
    const pos_x_num: number = (index + 1) % 7;
    const pos_y_num: number = parseInt(((index + 1) / 7).toString(), 10);
    this.style = `top: ${70 + 152 * pos_y_num}px; left: ${70 +
      152 * pos_x_num}px;`;

    var self = this;
    $(document).ready(function() {
      $("img").mouseup(function(e) {
        const id = e.target.offsetParent.classList[2].split("__")[1];
        const clickedItem = self.items.filter(item => item.id === id);
        self.attendeeAction.setClickedItem(clickedItem[0]);
        self.attendeeStepService.goToDetailShow();
        $(".virtual-item-button").click();
      });
    });
  }

  ngOnChanges() {
    console.log("for attendee- change??", this.url);
  }
}
