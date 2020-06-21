import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "../services/user.service";
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import * as statusBar from 'nativescript-status-bar'
import { Stretch ,Image} from 'tns-core-modules/ui/image'
import { myData } from "../myData";
import * as language from "./language";
@Component({
    selector: 'shell',
    providers: [UserService],
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.css']
})

export class ShellComponent implements OnInit {
    private _mainContentText: string;
    name = myData.user_name;
    email = myData.email;
    lang = myData.chosen_lang;
    used_lang = language.default[this.lang];
    constructor(private userservice: UserService, private router: RouterExtensions, private page: Page) {
        page.actionBarHidden = true;
    }
    // @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    // private drawer: RadSideDrawer;
    // logout() {
    //     this.userservice.logout();
    //     this.router.navigate(["login"], { clearHistory: true });
    // }
    ngOnInit() {
        statusBar.hide();
        this.mainContentText = "OKOK";
        console.log("Chosenlang",this.lang);
        console.log("task: ",language.default[this.lang]);
    }
    form_nav() {
        this.router.navigate(["/form"]);
    }
    task_nav() {
        this.router.navigate(["/task"]);
    }
    home_nav() {
        this.router.navigate(["/home"]);
    }
    logout_nav() {
        this.router.navigate(["/login"]);
    }
    list_nav() {
        this.router.navigate(["/list"]);
    }
    about_nav() {
        this.router.navigate(["/about"]);
    }
   lang_nav() {
        this.router.navigate(["/changelang"]);
    }
    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    // public openDrawer() {
    //     this.drawer.showDrawer();
    // }

    // public onCloseDrawerTap() {
    //     this.drawer.closeDrawer();
    // }
}