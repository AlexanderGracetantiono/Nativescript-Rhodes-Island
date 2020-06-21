import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Operator } from "../model/operator.model";
import { OperatorService } from "../services/operator.service";
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";
import * as firebase from "nativescript-plugin-firebase";
import { myData } from "../myData";
import * as language from "./language";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import InAppBrowser from 'nativescript-inappbrowser'
import { openUrl } from 'tns-core-modules/utils/utils'
@Component({
  selector: 'ns-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.css'],
  providers: [OperatorService]
})
export class LangComponent implements OnInit {
  temp_language = myData.chosen_lang;
  lang = myData.chosen_lang;
  used_lang = language.default[this.lang];
  @ViewChild("operatorTextField", { static: false }) operatorTextField: ElementRef;
  constructor(
    private page: Page,
    private operatorService: OperatorService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }
  onTap(id: string) {
    switch (id) {
      case "en":
        this.temp_language = "EN";
        break;
      case "id":
        this.temp_language = "ID";
        break;
      case "save":
        myData.chosen_lang = this.temp_language;
        this.router.navigate(["/reset"]);
        break;

      default:
        break;
    }
  }
}
