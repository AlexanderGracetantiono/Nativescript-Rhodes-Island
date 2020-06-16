import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LoginComponent } from "./login/login.component";
import { ListComponent } from "./list/list.component";
import { FormComponent } from "./form/form.component";
import { ShellComponent } from "./shell/shell.component";
import { Ops_detailComponent } from "./ops_detail/ops_detail.component";
import { HomeComponent } from "./home/home.component";
import { TaskComponent } from "./task/task.component";
const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
        {
            path: "",
            component: ShellComponent,
            children: [
                { path: "home", component: HomeComponent },
                { path: "items", component: ItemsComponent },
                { path: "item/:id", component: ItemDetailComponent },
                { path: "list", component: ListComponent },
                { path: "task", component: TaskComponent },
                { path: "operator/:id", component: Ops_detailComponent },
                { path: "form", component: FormComponent },
            ]
        }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
