import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxCsvParserModule } from "ngx-csv-parser";

import { AppComponent } from "./app.component";
import { AppLiveComponent } from "./views/app-live/appLive.component";
import { AppFooterComponent } from "./views/app-footer/appFooter.component";
import { AppCartComponent } from "./views/app-cart/appCart.component";

import { AppTimeComponent } from "./app-items/app-time/appTime.component";
import { AppShopComponent } from "./app-items/app-shop/appShop.component";
import { HostedItemComponent } from "./app-items/hosted-item/hostedItem.component";
import { AttendeeHostedItemComponent } from "./app-items/attendee-hosted-item/attendeeHostedItem.component";
import { ContactInfoComponent } from "./views/contact-info/contactInfo.component";
import { BillingAddressComponent } from "./views/billing-address/billingAddress.component";
import { ShippingAddressComponent } from "./views/shipping-address/shippingAddress.component";
import { PaymentInfoComponent } from "./views/payment-info/paymentInfo.component";
import { MyCartComponent } from "./views/my-cart/myCart.component";
import { ReviewOrderComponent } from "./views/review-order/reviewOrder.component";

import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    NgxCsvParserModule
  ],
  declarations: [
    AppComponent,
    AppLiveComponent,
    AppFooterComponent,
    AppTimeComponent,
    AppShopComponent,
    AppCartComponent,
    HostedItemComponent,
    AttendeeHostedItemComponent,
    ContactInfoComponent,
    MyCartComponent,
    BillingAddressComponent,
    ShippingAddressComponent,
    PaymentInfoComponent,
    ReviewOrderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
