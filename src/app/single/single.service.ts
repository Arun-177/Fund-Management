import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})

export class SingleService {

    constructor(private http: HttpClient) { }


    
    getData(data:string,startDate:Number,endDate:Number): Observable<any> {
        const options = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>('http://localhost:3000/getData',{value:data,'startDate':startDate,'endDate':endDate}).pipe(
      );
    }

    getDocsData(key:string,category:string,item:string): Observable<any> {
        const options = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>('http://localhost:3000/getDocsData',{'key':key,'category':category,'item':item}).pipe(
      );
    }
  

}
