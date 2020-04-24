import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Operator } from "../model/operator.model";
import { OperatorService } from "../services/operator.service";
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OperatorService]
})
export class HomeComponent implements OnInit {
  operatorList: Operator[];
  operator: Operator = {
    _id: 0,
    name: ''
  }
  listLoaded = false;
  isLoading = false;
  @ViewChild("operatorTextField", { static: false }) operatorTextField: ElementRef;
  constructor(
    private operatorService: OperatorService
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
    this.operatorService.load().subscribe(res => {
      console.log("result: ", res)
      this.operatorList = res as Operator[];
      this.isLoading = false;
      this.listLoaded = true;
    },
      err => {
        console.log(err);
      }
    )
  }
  add() {
    if (this.operator.name.trim() === "") {
      alert("Enter operator name");
      return;
    }
    this.operatorService.add(this.operator).subscribe((obj: Operator) => {
      this.operatorList.unshift(obj)
      this.operator.name = ""
      console.log("response: ", obj);
    })
  }
  delete(args: ListViewEventData) {
    let operator = <Operator>args.object.bindingContext;
    this.operatorService.delete(operator._id)
      .subscribe(() => {
        let index = this.operatorList.indexOf(operator);
        this.operatorList.splice(index, 1);
      });
  }
}
