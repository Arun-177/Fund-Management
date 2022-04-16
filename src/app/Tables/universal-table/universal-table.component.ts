import { Component, Input, OnInit, ViewChild,AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-universal-table',
  templateUrl: './universal-table.component.html',
  styleUrls: ['./universal-table.component.scss']
})
export class UniversalTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data:any;
  displayedColumns: string[] = ['date', 'name','amount','creditdebit','comment'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterViewInit();
  }

  ngOnInit(): void {
    console.log('in universal table', this.data)
    // this.dataSource = new MatTableDataSource(this.data);
    // this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
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
