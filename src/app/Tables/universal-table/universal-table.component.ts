import { Component, Input, OnInit, ViewChild,AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';

import { UniversalTableService } from './universal-table.service';

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
  @Input() tableLocation:any;
  @Input() item:any;
  @Input() category:any;

  tableData:any | undefined
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] 
  
   private paginator: MatPaginator;
  private sort: MatSort;


  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  
  constructor(private tableService: UniversalTableService,
              private cdr: ChangeDetectorRef) { }
  ngOnChanges(): void {
    this.ngAfterViewInit();
    this.data = this.tableService.prepareTableData(this.data)
    console.log('in universal table afterViewInit - ',this.data)
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.displayedColumns = this.tableService.getAnalyticsDisplayedColumns(this.item,this.tableLocation);
    console.log('in universal table', this.data)
  }

  ngAfterViewInit(): void {
    // this.cdr.detectChanges();
    // this.data = this.tableService.prepareTableData(this.data)
    // console.log('in universal table afterViewInit - ',this.data)
    // this.dataSource = new MatTableDataSource(this.data);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
