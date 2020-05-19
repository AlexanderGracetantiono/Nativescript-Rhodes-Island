import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../model/user.model";
import { Config } from "../config";
const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        console.log("user",user.email,user.password)
        return new Promise((resolve, reject) => {
            firebase.createUser({
                email: user.email,
                password: user.password
              }).then(
                function (result) {
                    JSON.stringify(result);
                    resolve(result);
                },
                function (errorMessage) {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        })
    }
    loginGoogle() {
        return new Promise((resolve, reject) => {
            firebase.login({
                type: firebase.LoginType.GOOGLE,
            }).then(
                function (result) {
                    JSON.stringify(result);
                    resolve(result);
                },
                function (errorMessage) {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        })
    }
    login(user: User) {
        // console.log("user",user.email,user.password)
        return new Promise((resolve, reject) => {
            firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: user.email,
                    password: user.password
                }
            }).then(
                function (result) {
                    JSON.stringify(result);
                    // console.log(result.email)
                    resolve(result.email);
                },
                function (errorMessage) {
                    console.log(errorMessage);
                    reject(errorMessage);
                }
            );
        })
    }
    getCommonHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": Config.authHeader
        }
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}