import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "../services/user.service";
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as statusBar from 'nativescript-status-bar'
import { myData } from "../myData";
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

    constructor(private userservice: UserService, private router: RouterExtensions, private page: Page) {
        page.actionBarHidden = true;
    }
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    // logout() {
    //     this.userservice.logout();
    //     this.router.navigate(["login"], { clearHistory: true });
    // }
    ngOnInit() {
        statusBar.hide();
        this.mainContentText = "OKOK";
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
    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }
}