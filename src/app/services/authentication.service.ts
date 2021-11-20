import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  url:string;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/auth/v1/';
  }

  authenticateUser(data) {
    return this.http.post(this.url, data)
  } 

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<any> {
    return this.http.post(this.url + 'isAuthenticated', {
      headers:{ Authorization: 'Bearer ' + token }
    }).toPromise();
  }
}
