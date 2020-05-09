import { Component, OnInit } from '@angular/core';
import { User } from "../model/user.model";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import * as firebase from "nativescript-plugin-firebase";
// const firebase = require("nativescript-plugin-firebase");
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
    this.user_entity.email = "alexander.remains.1247@gmail.com"
    this.user_entity.password = "8gatsunonikki"
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    // var listener = {
    //   onAuthStateChanged: function(data) {
    //     console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
    //     if (data.loggedIn) {
    //       console.log("User info", data.user);
    //     }
    //   },
    //   thisArg: this
    // };

    // // add the listener:
    // firebase.addAuthStateListener(listener);

    // // stop listening to auth state changes:
    // firebase.removeAuthStateListener(listener);

    // // check if already listening to auth state changes
    // firebase.hasAuthStateListener(listener);
    // firebase.init({
    // }).then(
    //   () => {
    //     console.log("firebase.init done");
    //   },
    //   error => {
    //     console.log(`firebase.init error: ${error}`);
    //   }
    // );
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
    firebase.login(
      {
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: this.user_entity.email,
          password: this.user_entity.password
        }
      })
      .then(result => {
        console.log("Hasil UID:", result.uid);
        if (result.uid != null) {
          this.router.navigate(["/home"])
        }
        // var data = JSON.stringify(result)
        // data.search('uid');
      })
      .catch(error => {
        alert({
          title: "Login Invalid",
          message: "Email dan Password salah",
          okButtonText: "OK, got it"
        })
        console.log("error:", JSON.parse(error))
      }

      );
    // firebase.auth().signInWithEmailAndPassword(this.user_entity.email,this.user_entity.password)
    // .then(() => console.log("User logged in"))
    // .catch(err => console.log("Login error: " + JSON.stringify(err)));
    // this.userservice.login(this.user_entity)
    // .subscribe(
    //   () => this.router.navigate(["/home"]),
    //   (exception) => {
    //       if(exception.error && exception.error.description) {
    //           alert(exception.error.description);
    //       } else {
    //           alert(exception)
    //       }
    //   }
    // );
  }
  handleSignUp() {
    firebase.createUser({
      email: this.user_entity.email,
      password: this.user_entity.password
    })
      .then(
        function (result) {
          console.log("Created", result);
          this.handleChangeState();
          alert({
            title: "Congrats",
            message: "User created",
            okButtonText: "Nice!"
          })
        },
        function (errorMessage) {
          console.log("Error");
          alert({
            title: "No user created",
            message: errorMessage,
            okButtonText: "OK, got it"
          })
        })
    // this.userservice.register(this.user_entity)
    //   .subscribe(
    //     () => {
    //       alert("Your account was successfully created.");
    //       this.handleChangeState();
    //     },
    //     (exception) => {
    //       if (exception.error && exception.error.description) {
    //         alert(exception.error.description);
    //       } else {
    //         alert(exception)
    //       }
    //     }
    //   );
    // this.userservice.register(this.user_entity)
    //   .subscribe(
    //     () => {
    //       alert("Your account was successfully created.");
    //       this.handleChangeState();
    //     },
    //     (exception) => {
    //       if (exception.error && exception.error.description) {
    //         alert(exception.error.description);
    //       } else {
    //         alert(exception)
    //       }
    //     }
    //   );
  }
  handleChangeState() {
    this.isLogin = !this.isLogin;
  }

}
