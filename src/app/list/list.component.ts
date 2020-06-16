import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Operator } from "../model/operator.model";
import { OperatorService } from "../services/operator.service";
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { Router } from "@angular/router";
import * as firebase from "nativescript-plugin-firebase";
@Component({
  selector: 'ns-home',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [OperatorService]
})
export class ListComponent implements OnInit {
  operatorList: Operator[];
  operator: Operator = {
    id: "",
    name: '',
    class: 0,
    baseATK:"",
    baseHP:"",
    baseDEF:"",
    img:"",
  }
  newKey = ""
  listOps = [];
  listLoaded = false;
  isLoading = false;
  @ViewChild("operatorTextField", { static: false }) operatorTextField: ElementRef;
  constructor(
    private operatorService: OperatorService,
    private router: Router,
  ) { }
  onSwipeCellStarted(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args.object;
    var rightItem = swipeView.getViewById<View>("delete-view");
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.left = 0;
    swipeLimits.threshold = rightItem.getMeasuredWidth();
  }

  ngOnInit(): void {
    this.isLoading = true;
    firebase.getValue('/operators')
      .then(result => {
        console.log("RES: ",result)
        this.isLoading = false;
        this.listLoaded = true;
        for (const key in result.value) {
          if (result.value.hasOwnProperty(key)) {
            const element = result.value[key];
            var className:string;
            switch (element.class) {
              case 0:
                className="Sniper"
                break;
              case 1:
                className="Caster"
                break;
              case 2:
                className="Healer"
                break;
              case 3:
                className="Guard"
                break;
            
              default:
                break;
            }
            this.listOps.push({
              id: key,
              name: element.name,
              class: element.class,
              className: className,
            })
          }
        }
        console.log("Hasil get ops", this.listOps)
      })
      .catch(error => console.log("Error: " + error));
  }

  add() {
    this.router.navigate(["/form"])
    // if (this.operator.name.trim() === "") {
    //   alert("Enter operator name");
    //   return;
    // }
    // firebase.push(
    //   '/operators',
    //   {
    //     'name': this.operator.name,
    //     'class': 1
    //   }
    // ).then(
    //   res=> {
    //     console.log("Res Promise:",res)
    //     this.listOps.push({
    //       id: res.key,
    //       name: this.operator.name,
    //       class: 1
    //     })
    //   }
    // function (result) {
    //   console.log("created push: " + result.key);
    //   console.log("created lisops: " , this.lisops);
    //   this.listOps.unshift({
    //     id: result.key,
    //     name: this.operator.name,
    //     class: 1
    //   })
    // }
    // );
    // this.listOps.push({
    //   id: this.newKey,
    //   name: this.operator.name,
    //   class: 1
    // })

    // this.operatorService.add(this.operator).subscribe((obj: Operator) => {
    //   this.operatorList.unshift(obj)
    //   this.operator.name = ""
    //   console.log("response: ", obj);
    // })
  }
  delete(args: ListViewEventData) {
    console.log("Delete args: ", args)
    let operator = <Operator>args.object.bindingContext;
    // console.log("Delete", operator)
    firebase.remove("/operators/" + operator.id)
      .then(result => {
        console.log("Hasil delete", result)
        var index = this.listOps.map(x => {
          return x.id;
        }).indexOf(operator.id);
        console.log("Data splice:", index)
        this.listOps.splice(index, 1);
      })
      .catch(error => console.log("Error: " + error));
    console.log("Hasil: ", this.listOps.indexOf(this.operator.id));
    // console.log(this.operatorList);

    // this.operatorList = this.operatorList.filter(x => {
    //   return x.id != operator.id;
    // })
    // console.log(this.operatorList);
    //   firebase.update(
    //     '/operators/'+operator.id,
    //     {'foo':'baz'}
    // );
    // this.operatorService.delete(operator._id)
    //   .subscribe(() => {
    //     let index = this.operatorList.indexOf(operator);
    //     this.operatorList.splice(index, 1);
    //   });
  }
}
