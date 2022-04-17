import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import {UtilityService} from '../../Services/utility-services'



@Injectable({
    providedIn:'root'
})
export class UniversalTableService{

    accountDisplayedColumns: string[] = ['date', 'name','amount','creditdebit','comment'];
    stockDisplayedColumns: string[] = ['date', 'name','quantity','price','amount','creditdebit','comment'];



  constructor(private service: UtilityService) { }

    getAnalyticsDisplayedColumns(item:string,tableLocation:string){
        if(item!='groww' && item!='kite'){
            return this.accountDisplayedColumns;
        }
        return this.stockDisplayedColumns;
    }

    prepareTableData(data:any){
        data.forEach((element:any)=>{
            // if(!element.date1){
                element.date1 = this.service.changeDateFormat(element.date)
            // }
          })


        // data.forEach((element:any)=>{
        //     element.date1 = Number(((this.service.getDate(element.date) < 10) ? '0' : '') + this.service.getDate(element.date));
        //     if(!Number.isNaN(element.date1)){
        //         element.date = element.date1 + this.service.changeDateFormat(element.date).slice(2)
        //     }
      
        // })
        return data;
    }


}