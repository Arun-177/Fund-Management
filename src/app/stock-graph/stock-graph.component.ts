import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label  } from 'ng2-charts';


@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent implements OnInit, OnChanges {
    @Input() graphData:any;



  public lineChartData: ChartDataSets[] = [{ data: [], 
                                            label: 'Debit',
                                          },  
                                          { data: [], 
                                            label: 'Credit' },  
                                          { data: [], 
                                            label: 'Total Debited' },  
                                          { data: [], 
                                            label: 'Total Credited' },
                                          ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'pink',
      backgroundColor: 'green',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType  = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
    this.modifyData();

  }
  ngOnChanges(): void {
    this.modifyData();
  }

    changeDateFormat(timestamp:number){
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

  getDate(value:any){

    const date = new Date(value);
    return date.getDate();
  }

  modifyData(){
    // console.log('this.graphData - ',this.graphData)
    if(this.graphData){
      const todayDate = new Date();
      const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
      this.lineChartLabels=[];
      this.lineChartData[0].data=[];
      this!.lineChartData[1]!.data=[];
      this!.lineChartData[2]!.data=[];
      this!.lineChartData[3]!.data=[];
      for(let i=1; i<=todayDate.getDate(); i++){
        this.lineChartData[0].data.push(0);
        this!.lineChartData[1]!.data!.push(0);
        this!.lineChartData[2]!.data!.push(0);
        this!.lineChartData[3]!.data!.push(0);
        this.lineChartLabels.push(i+ ' ' + month[todayDate.getMonth()])
      }
      let tmp:any;
      this.graphData.forEach((element:any)=>{
      tmp = this.changeDateFormat(element.date);
      if(element.creditdebit=='credit'){
        this!.lineChartData[1]!.data![this.lineChartLabels.indexOf(tmp.slice(0,tmp.indexOf(',')))]+=element.amount;
      }else{
        this!.lineChartData[0]!.data![this.lineChartLabels.indexOf(tmp.slice(0,tmp.indexOf(',')))]+=element.amount;
      }
      element.date1 = Number(((this.getDate(element.date) < 10) ? '0' : '') + this.getDate(element.date));
      })
      this!.lineChartData[3]!.data[0] = this!.lineChartData[1]!.data[0];
      this!.lineChartData[2]!.data[0] = this!.lineChartData[0]!.data[0];
      for(let i=2; i<=todayDate.getDate(); i++){
        this!.lineChartData[3]!.data[i-1] = Number(this!.lineChartData[3]!.data[i-2]) + Number(this!.lineChartData[1]!.data[i-1]);
        this!.lineChartData[2]!.data[i-1] = Number(this!.lineChartData[2]!.data[i-2]) + Number(this!.lineChartData[0]!.data[i-1]);
      }
    }
  }

}