import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Item } from "../../shared/models/item";
import { HostingService } from "../../shared/services/hosting.service";
import { RoleService } from "../../shared/services/role.service";

@Component({
  selector: "app-live",
  templateUrl: "./appLive.component.html",
  styleUrls: ["./appLive.component.css"]
})
export class AppLiveComponent implements OnInit {
  @Input() items: Array<Item>;
  @Input() currentRole: string;
  isShow: Boolean;

  constructor(
    public hostingService: HostingService,
    public roleService: RoleService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    console.log("change? ", this.items);
    console.log("change? ", this.currentRole);
    this.isShow = this.currentRole === "host";
  }

  hostItems() {
    this.hostingService.hostItems();
  }
}
