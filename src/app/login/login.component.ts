import { Component, OnInit } from '@angular/core';
import { User } from "../model/user.model";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
@Component({
  selector: 'ns-login',
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_entity: User;
  isLogin = true;
  constructor(
    private userservice: UserService,
    private router: Router,
    private page: Page,
  ) {
    this.user_entity = new User();
    this.user_entity.email="alexander.1111@gmail.com"
    this.user_entity.password="1111"
  }

  ngOnInit(): void {
    this.page.actionBarHidden=true;
  }
  handleSubmit() {
    if (this.isLogin) {
      this.handleLogin();
    } else {
      this.handleSignUp();
    }
  }
  handleLogin() {
    // alert("You're using: " + this.user_entity.email);
    this.userservice.login(this.user_entity)
    .subscribe(
      () => this.router.navigate(["/home"]),
      (exception) => {
          if(exception.error && exception.error.description) {
              alert(exception.error.description);
          } else {
              alert(exception)
          }
      }
    );
  }
  handleSignUp() {
    //  this.userservice.register(this.user_entity);
      this.userservice.register(this.user_entity)
        .subscribe(
          () => {
            alert("Your account was successfully created.");
            this.handleChangeState();
          },
          (exception) => {
            if (exception.error && exception.error.description) {
              alert(exception.error.description);
            } else {
              alert(exception)
            }
          }
        );
    }
    handleChangeState(){
      this.isLogin = !this.isLogin;
    }

  }
