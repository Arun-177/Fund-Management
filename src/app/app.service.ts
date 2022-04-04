import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  


  getBranches(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/getDropDownItem').pipe(
    //   tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data)))
      );
  }

    getSubCategory(data:string): Observable<any> {
        // data = data.toLowerCase().replace(/\s/g, "");
        const options = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>('http://localhost:3000/countItem',{value:data}).pipe(
        //   tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data)))
      );
  }

    getHighLevelViewData(startDate:Number,endDate:Number): Observable<any> {
      const options = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>('http://localhost:3000/getHighLevelViewData',{'startDate':startDate,'endDate':endDate}).pipe(
      );
  }
}
