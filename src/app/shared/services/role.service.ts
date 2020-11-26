import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { url } from "../models/url";

@Injectable({ providedIn: "root" })
export class RoleService {
  currentRole: string = "";

  constructor(private http: HttpClient) {}

  createHostRole() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };

    return this.http
      .post<any>(`${url}/todos/role`, null, options)
      .subscribe(data => {
        console.log("role created : ", data);
      });
  }

  getCurrentRole() {
    return this.http.get<any>(`${url}/todos/role`).subscribe(data => {
      this.currentRole = data.content;
    });
  }

  getRole() {
    return this.currentRole;
  }

  setRole(role: string) {
    this.currentRole = role;
  }
}
