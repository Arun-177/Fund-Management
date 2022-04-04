import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-bank-table-mat',
  templateUrl: './bank-table-mat.component.html',
  styleUrls: ['./bank-table-mat.component.scss']
})
export class BankTableMatComponent implements OnInit,AfterViewInit {
  
  @Input() data:any;

  displayedColumns: string[] = ['date1', 'name','amount','creditdebit','comment',];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.data)
    this.data.forEach((element:any)=>{
      element.date1 = Number(((this.getDate(element.date) < 10) ? '0' : '') + this.getDate(element.date));
      if(!Number.isNaN(element.date1)){
        element.date = element.date1 + this.changeDateFormat(element.date).slice(2)
      }
      
    })
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeDateFormat(timestamp:any){
    if(String(Number(timestamp))!=timestamp){
      return timestamp
    }
    console.log('--------------------------------------------------------------- changeDateFormat in bank-table-mat')
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


    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDate(value:any){

    const date = new Date(value);
    return date.getDate();
  }

}
