import { Component, Input, OnInit,SimpleChanges, ViewChild } from '@angular/core';


import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label  } from 'ng2-charts';

import {SingleService} from './single.service'


@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})


export class SingleComponent implements OnInit {
  @Input() item:any;

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



  constructor(private service: SingleService) { }

  data:any;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(!changes.firstChange){
      this.getData();
    }

  }

  
    getData(){
    this.service.getData(this.item).subscribe(
      (res) => {
        if(res.status=='success'){
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
            console.log(todayDate.getDate())
            this.lineChartLabels.push(i+ ' ' + month[todayDate.getMonth()])
          }
          res.message.forEach((element:any)=>{
            element.date = this.changeDateFormat(element.date);
            console.log(element.date,element.date.slice(0,element.date.indexOf(',')))
            if(element.creditdebit=='credit'){
            this!.lineChartData[1]!.data![this.lineChartLabels.indexOf(element.date.slice(0,element.date.indexOf(',')))]+=element.amount;
            }else{
            this!.lineChartData[0]!.data![this.lineChartLabels.indexOf(element.date.slice(0,element.date.indexOf(',')))]+=element.amount;
            }
          })
          this!.lineChartData[3]!.data[0] = this!.lineChartData[1]!.data[0];
          this!.lineChartData[2]!.data[0] = this!.lineChartData[0]!.data[0];
          for(let i=2; i<=todayDate.getDate(); i++){
            // if(this!.lineChartData[3]!.data[i-1] !=null && )
            this!.lineChartData[3]!.data[i-1] = Number(this!.lineChartData[3]!.data[i-2]) + Number(this!.lineChartData[1]!.data[i-1]);
            this!.lineChartData[2]!.data[i-1] = Number(this!.lineChartData[2]!.data[i-2]) + Number(this!.lineChartData[0]!.data[i-1]);
          }
          this.data = res.message
        }
        else{
          this.data = undefined

        }
      },
      (err) => {
        this.data=undefined;
      });

  };

  changeDateFormat(timestamp:number){
    const date = new Date(timestamp);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    if(date.getHours() !=0 || date.getMinutes() !=0 || date.getSeconds() !=0){
      return ((date.getDate() < 10) ? '0' : '') + date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear() + ' at ' +
      ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' + 
      ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes() + ':' + 
      ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds()
    }
    return date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear();

  }

}
