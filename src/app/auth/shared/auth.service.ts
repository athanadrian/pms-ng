import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from "moment";

import "rxjs/Rx";

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = "";
}

@Injectable()
export class AuthService {
  private decodedToken: DecodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem("pms-meta")) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem("pms_auth", token);
    localStorage.setItem("pms_meta", JSON.stringify(this.decodedToken));
    return token;
  }

  private getTokenExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public login(loginData: any): Observable<any> {
    return this.http
      .post("api/v1/users/auth", loginData)
      .map((token: string) => {
        return this.saveToken(token);
      });
  }

  public register(userData: any): Observable<any> {
    return this.http.post("api/v1/users/register", userData);
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getTokenExpiration());
  }

  public logout() {
    localStorage.removeItem('pms_auth');
    localStorage.removeItem('pms_meta');

    this.decodedToken = new DecodedToken();
  }

  public getAuthToken(): string {
    console.log('token ', localStorage.getItem('pms_auth'))
    return  localStorage.getItem('pms_auth');
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }
}
