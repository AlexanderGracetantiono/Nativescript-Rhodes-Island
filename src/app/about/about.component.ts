import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OperatorService } from "../services/operator.service";
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";
import InAppBrowser from 'nativescript-inappbrowser'
import { openUrl } from 'tns-core-modules/utils/utils'
import { registerElement } from 'nativescript-angular/element-registry';
import { Image } from 'tns-core-modules/ui/image';
import { AboutService } from "./about.service";
registerElement('Image', () => Image);
@Component({
  selector: 'ns-home',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [OperatorService]
})
export class AboutComponent implements OnInit {
  about_userdetail: {
    avatar: string,
    username: string,
    bio: string,
  };
  urls: string;
  @ViewChild("operatorTextField", { static: false }) operatorTextField: ElementRef;
  constructor(
    private AS: AboutService,
    private page: Page,
    private operatorService: OperatorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.page.actionBarHidden = true;
    this.AS.getUserData().subscribe((response: any) => {
      this.about_userdetail = {
        avatar: response.avatar_url,
        username: response.login,
        bio: response.bio,
      }
      this.urls = response.html_url
    });
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
  openLinkAnother = async (urls:string) => {
    try {
      const url = urls;
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
