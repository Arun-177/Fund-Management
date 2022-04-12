import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})

export class DocumentService {

    constructor(private http: HttpClient) { }


    updateDocsData(docsData:any,category:string,item:string): Observable<any> {
        const options = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>('http://localhost:3000/updateDocsData',{'docsData':docsData,'category':category,'item':item}).pipe(
      );
    }
  

}
