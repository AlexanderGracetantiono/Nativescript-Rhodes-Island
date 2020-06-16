import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import * as firebase from "nativescript-plugin-firebase";
import { Operator } from "../model/operator.model";
import * as dialogs from "tns-core-modules/ui/dialogs";
@Component({
  selector: 'ns-ops_detail',
  templateUrl: './ops_detail.component.html',
  styleUrls: ['./ops_detail.component.css']
})
export class Ops_detailComponent implements OnInit {
  public selectedIndex = 1;
  public items: Array<string> = ["Caster", "Sniper", "Healer"]
  rating = [];
  isLoading = false;
  operator_detail = {
    name: "",
    baseATK: 0,
    baseHP: 0,
    baseDEF: 0,
    img: "",
    class: 0
  };
  constructor(
    private router: Router,
    private page: Page,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    const id_detail = this.route.snapshot.params.id;
    this.page.actionBarHidden = true;
    console.log("data: ", id_detail);
    firebase.getValue('/operators/' + id_detail)
      .then(result => {
        this.operator_detail = {
          name: result.value.name,
          baseATK: result.value.baseATK,
          baseHP: result.value.baseHP,
          baseDEF: result.value.baseDEF,
          img: result.value.img,
          class: result.value.class,
        };
        // this.isLoading = false;
        // this.listLoaded = true;
        // for (const key in result.value) {
        //   if (result.value.hasOwnProperty(key)) {
        //     const element = result.value[key];
        //     console.log("Hasil foreach ", element.name)
        //     this.operator_detail.push({
        //       id: key,
        //       name: element.name,
        //       class: element.class,
        //       img: element.img,
        //     })
        //   }
        // }
        console.log("Hasil get ops", result)
      })
      .catch(error => console.log("Error: " + error));

    // this.item = this.itemService.getItem(id);
  }


}
