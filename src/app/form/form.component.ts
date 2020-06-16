import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import * as firebase from "nativescript-plugin-firebase";
import { Operator } from "../model/operator.model";
import * as dialogs from "tns-core-modules/ui/dialogs";
@Component({
  selector: 'ns-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public selectedIndex = 1;
  public items: Array<string> = ["Caster", "Sniper", "Healer","Guard"]
  operator: Operator = {
    id: "",
    name: '',
    class: 1,
    baseATK:"",
    baseHP:"",
    baseDEF:"",
    img:"",

  }
  isLoading = false;
  constructor(
    private router: Router,
    private page: Page,
  ) {
    // this.items = [];
    // for (var i = 0; i < 5; i++) {
    //     this.items.push("data item " + i);
    // }
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }


  public onchange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    this.operator.class = args.newIndex;
  }

  public onopen() {
    console.log("Drop Down opened.");
  }

  public onclose() {
    console.log("Drop Down closed.");
  }
  navigateHome() {
    this.router.navigate(["/home"])
  }
  handleSubmit() {
    this.isLoading = true;
    if (this.operator.name.trim() === "") {
      alert("Enter operator name");
      this.isLoading = false;
      return;
    }
    console.log("Class:", this.operator.class)
    firebase.push(
      '/operators',
      {
        'name': this.operator.name,
        'class': this.operator.class,
        'baseATK': this.operator.baseATK,
        'baseHP': this.operator.baseHP,
        'baseDEF': this.operator.baseDEF,
        'img': this.operator.img,
      }
    ).then(
      res => {
        this.isLoading = false;
        dialogs.alert({
          title: "Insert Success",
          message: "Insert " + this.operator.name + " Success",
          okButtonText: "OK, got it"
        }).then(() => {
          this.navigateHome()
        });
      }
    );
  }
}
