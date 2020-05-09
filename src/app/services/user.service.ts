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
        // if (!user.email || !user.password) {
        //     return throwError("Please provide both an email address and password.");
        // }

        // return this.http.post(
        //     Config.apiUrl + "user/" + Config.appKey,
        //     JSON.stringify({
        //         username: user.email,
        //         password: user.password
        //     }),
        //     { headers: this.getCommonHeaders() }
        // ).pipe(
        //     catchError(this.handleErrors)
        // );
        return firebase.createUser({
            email:user.email,
            password:user.password
        })
        .then(
            (res)=>console.log("reg res:",res)
        )
    }
    login(user: User) {
        return this.http.post(
            Config.apiUrl + "user/" + Config.appKey + "/login",
            JSON.stringify({
                username: user.email,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            map(response => response),
            tap(data => {
                Config.token = (<any>data)._kmd.authtoken
            }),
            catchError(this.handleErrors)
        );
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