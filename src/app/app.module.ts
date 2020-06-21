import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { DropDownModule } from "nativescript-drop-down/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ListComponent } from './list/list.component';
import { ShellComponent } from "./shell/shell.component";
import { FormComponent } from './form/form.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { Ops_detailComponent } from "./ops_detail/ops_detail.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
const firebase = require("nativescript-plugin-firebase");
firebase.init({
  persist: true,
  onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when they re-visit your app
    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
    if (data.loggedIn) {
      console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
    }
  },
  databaseURL:"/operators/operators"
}).then(
  () => {
    alert("Firebase done")
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);


@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptUISideDrawerModule,
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    HttpClientModule,
    NativeScriptUIListViewModule,
    DropDownModule,
  ],
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    LoginComponent,
    ListComponent,
    FormComponent,
    ShellComponent,
    Ops_detailComponent,
    HomeComponent,
    TaskComponent,
    AboutComponent
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
