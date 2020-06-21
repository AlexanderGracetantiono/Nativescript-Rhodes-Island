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
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OperatorService]
})
export class HomeComponent implements OnInit {
  user_name = myData.user_name;
  operator: Operator = {
    id: "",
    name: '',
    class: 0,
    baseATK: "",
    baseHP: "",
    baseDEF: "",
    img: "",
  }
  urls: string;
  lang = myData.chosen_lang;
  used_lang = language.default[this.lang];
  @ViewChild("operatorTextField", { static: false }) operatorTextField: ElementRef;
  constructor(
    private page: Page,
    private operatorService: OperatorService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.page.actionBarHidden = true;
  }
  onTap(id: string) {
    switch (id) {
      case "news":
        this.urls = "https://gamepress.gg/arknights/core-gameplay/arknights-cn-contingency-contract-cc-explained"
        this.openLink();
        break;
      case "banner":
        this.urls = "https://gamepress.gg/arknights/should-you-pull/arknights-should-you-pull-joint-operation"
        this.openLink();
        break;
      case "operation":
        this.urls = "https://gamepress.gg/arknights/"
        this.openLink();
        break;
      case "listops":
        this.router.navigate(["/list"]);
        break;
      case "task":
        this.router.navigate(["/task"]);
        break;
      case "lang":
        this.router.navigate(["/changelang"]);
        break;

      default:
        break;
    }
  }
  openLink = async () => {
    try {
      const url = this.urls;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#636363',
          preferredControlTintColor: 'white',
          readerMode: true,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: false,
          toolbarColor: '#636363',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        })
        // alert({
        //   title: 'Response',
        //   message: JSON.stringify(result),
        //   okButtonText: 'Ok'
        // })
      }
      else {
        openUrl(url);
      }
    }
    catch (error) {
      alert({
        title: 'Error',
        message: error.message,
        okButtonText: 'Ok'
      })
    }
  }

}
