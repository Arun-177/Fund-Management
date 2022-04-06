import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { UtilityService } from 'app/Services/utility-services';



@Component({
  selector: 'app-home-screen-table-mat',
  templateUrl: './home-screen-table-mat.component.html',
  styleUrls: ['./home-screen-table-mat.component.scss']
})
export class HomeScreenTableMatComponent implements OnInit,AfterViewInit {
  
  @Input() data:any;

  displayedColumns: string[] = ['date1', 'name','amount','creditdebit','comment',];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private uService:UtilityService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.data)
    this.data.forEach((element:any)=>{
      element.date1 = Number(((this.uService.getDate(element.date) < 10) ? '0' : '') + this.uService.getDate(element.date));
      if(!Number.isNaN(element.date1)){
        element.date = element.date1 + this.uService.changeDateFormat(element.date).slice(2)
      }
      
    })
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
