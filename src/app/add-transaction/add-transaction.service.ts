import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class AppAddTransaction {
  constructor(private http: HttpClient) { }
  

    insertData(data:any): Observable<any> {
        // data = data.toLowerCase().replace(/\s/g, "");
        const options = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>('http://localhost:3000/insertData',{value:data}).pipe(
        //   tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data)))
      );
  }
}
