import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post(
            API_URL + 'signin',
            {
                email,
                password,
            },
            httpOptions
        );
    }

    register(formdata: any): Observable<any> {
        return this.http.post(
            API_URL + 'signup', formdata,
            httpOptions
        );
    }

    logout(): Observable<any> {
        return this.http.post(API_URL + 'signout', {}, httpOptions);
    }
}
