import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class HeaderService {
  constructor(private http: HttpClient) { }
  
  getLastLoginTime(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/lastlogintime').pipe(
    //   tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data)))
      );
  }

  getDropDownItem(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/getDropDownItem').pipe(
    //   tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data)))
      );
  }
}
