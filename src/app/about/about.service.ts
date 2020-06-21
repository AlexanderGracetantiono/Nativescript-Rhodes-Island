import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: "root"
})
export class AboutService {
    baseUrl = `https://api.github.com/users`;

    constructor(private http: HttpClient){

    }

    getUserData(){
        return this.http.get(`${this.baseUrl}/AlexanderGracetantiono`);
    }
}
