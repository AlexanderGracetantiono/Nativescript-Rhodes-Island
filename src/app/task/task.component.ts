import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from "../model/task.model";
import { OperatorService } from "../services/operator.service";
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { Router } from "@angular/router";
import * as firebase from "nativescript-plugin-firebase";
import { myData } from "../myData";
import * as dialogs from "tns-core-modules/ui/dialogs";
@Component({
  selector: 'ns-home',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [OperatorService]
})
export class TaskComponent implements OnInit {
  task_label: string;
  task: Task = {
    user_id: "",
    task_name: '',
  }
  newKey = ""
  taskList = [];
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
    firebase.getValue('/tasks')
      .then(result => {
        console.log("RES: ", result)
        this.isLoading = false;
        this.listLoaded = true;
        for (const key in result.value) {
          if (result.value.hasOwnProperty(key)) {
            const element = result.value[key];

            console.log("Hasil foreach ", element.uid)
            if (element.uid == myData.user_id) {
              this.taskList.push({
                user_id:key,
                task_label: element.task_label,
              })
            }
          }
        }
        console.log("Hasil get ops", this.taskList)
      })
      .catch(error => console.log("Error: " + error));
  }

  add() {
    firebase.push(
      '/tasks',
      {
        'uid': myData.user_id,
        'task_label': this.task_label
      }
    ).then(
      res => {
        this.isLoading = false;
        dialogs.alert({
          title: "Insert Success",
          okButtonText: "OK, got it"
        }).then(() => {
          this.taskList.push({
            task_label: this.task_label
          })
          this.task_label = "";
        });
      }
    );
  }
  delete(args: ListViewEventData) {
    let task = <Task>args.object.bindingContext;
    firebase.remove("/tasks/" + task.user_id)
      .then(result => {
        console.log("Hasil delete", result)
        var index = this.taskList.map(x => {
          return x.id;
        }).indexOf(task.user_id);
        console.log("Data splice:", index)
        this.taskList.splice(index, 1);
      })
      .catch(error => console.log("Error: " + error));
    console.log("Hasil: ", this.taskList.indexOf(this.task.user_id));
  }
}
