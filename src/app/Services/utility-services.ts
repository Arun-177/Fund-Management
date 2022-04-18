import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class UtilityService{


    constructor(private http: HttpClient){}


    getDate(value:any){

        const date = new Date(value);
        return date.getDate();
    }

    changeDateFormat(timestamp:any){
        if(String(Number(timestamp))!=timestamp){
            return timestamp;
        }
        const date = new Date(timestamp);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        if(date.getHours() !=0 || date.getMinutes() !=0 || date.getSeconds() !=0){
            return ((date.getDate() < 10) ? '0' : '') + date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear() + ' at ' +
            ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' + 
            ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes() + ':' + 
            ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds()
        }
        return ((date.getDate() < 10) ? '0' : '') + date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear();
    }

        changeDateFormatForHomePageGraph(timestamp:any){
        if(String(Number(timestamp))!=timestamp){
            return timestamp;
        }
        const date = new Date(timestamp);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        
        return date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear();
    }

    getData(data:string,startDate:Number,endDate:Number): Observable<any> {
        const options = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>('http://localhost:3000/getData',{value:data,'startDate':startDate,'endDate':endDate}).pipe(
      );
    }

}