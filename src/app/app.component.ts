import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "./shared/models/item";
import { url } from "./shared/models/url";
import { RoleService } from "./shared/services/role.service";
import { HostingService } from "./shared/services/hosting.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  items: Array<Item> = [];
  currentRole: string;

  constructor(
    private http: HttpClient,
    public roleService: RoleService,
    public hostingService: HostingService
  ) {}

  ngOnInit() {
    this.http.get<any>(`${url}/todos/role`).subscribe(data => {
      this.currentRole = data.content;
      this.roleService.setRole(this.currentRole);

      if (this.currentRole === "host") {
        this.roleService.createHostRole();
        this.http.get<any>(`${url}/todos/1`).subscribe(serverItems => {
          serverItems.content.map(serverItem => {
            let item = {
              id: "",
              name: "",
              price: "",
              description: "",
              url: "",
              content: [],
              visability: false,
              x: 0,
              y: 0
            };
            item.id = serverItem[0];
            item.name = serverItem[1];
            item.price = serverItem[2];
            item.description = serverItem[28];
            item.url = `https://cdn.origamiowl.com/images/products/${
              item.id
            }/0/${
              serverItem[20] === "nopic.gif" ? item.id + ".png" : serverItem[20]
            }`;
            item.content = serverItem;
            item.visability = false;
            item.x = 0;
            item.y = 0;
            this.items.push(item);
          });
        });
      } else if (this.currentRole === "attendee") {
        this.http.get<any>(`${url}/todos`).subscribe(hostedItems => {
          hostedItems.map(hostedItem => {
            if (hostedItem.id !== "role") {
              let item = {
                id: hostedItem.item_id,
                name: hostedItem.name,
                price: hostedItem.price,
                description: hostedItem.description,
                url: hostedItem.image_url,
                content: hostedItem.content,
                visability: false,
                x: 0,
                y: 0
              };

              this.items.push(item);
            }
          });
        });
      } else console.log("break");
    });
  }
}
