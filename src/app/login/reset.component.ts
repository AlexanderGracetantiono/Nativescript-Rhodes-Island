import { Component, OnInit } from '@angular/core';
import { User } from "../model/user.model";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import * as firebase from "nativescript-plugin-firebase";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { EventData } from "tns-core-modules/data/observable";
import * as statusBar from 'nativescript-status-bar'
// const firebase = require("nativescript-plugin-firebase");
@Component({
  selector: 'ns-reset',
  providers: [UserService],
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {
 
  constructor(
    private userservice: UserService,
    private router: Router,
    private page: Page,
  ) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.router.navigate(["/home"])
  }
  

}
