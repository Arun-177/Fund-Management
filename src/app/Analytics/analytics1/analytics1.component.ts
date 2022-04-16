import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import {UtilityService} from '../../Services/utility-services'

@Component({
  selector: 'app-analytics1',
  templateUrl: './analytics1.component.html',
  styleUrls: ['./analytics1.component.scss']
})
export class Analytics1Component implements OnInit, OnChanges {
  @Input() item:any;
  @Input() category:any;
  @Input() data:any;

  completeData:any | undefined;
  completeDataLoaded:boolean = false;
  isError:boolean = false;
  errorMessage:any | undefined;
  fundCredited:any=0;
  fundDebited:any=0;
  shareBought:any=0;
  shareSold:any=0;

  constructor(private service: UtilityService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    console.log(this.item,this.category,this.data);

    this.service.getData(this.item,0,Number(new Date())).subscribe(
      (res) => {
        if(res.status=='success'){          
          this.completeData = res.message
          this.completeData.forEach((element:any)=>{
            element.date1 = this.service.changeDateFormat(element.date)
          })
          console.log('in analytics1 -',this.completeData)
          this.completeDataLoaded = true;
        }
        else{
          this.completeData = undefined;
          this.completeDataLoaded = false
          this.isError=true;
          this.errorMessage = 'res received but res.status is not success'
        }
      },
      (err) => {
        this.isError=true;
        this.completeDataLoaded = false
        this.errorMessage = 'some err occurred'
        this.completeData=undefined;
      });

    this.data.forEach((element:any) => {
      if(element.comment.toLowerCase() =="share bought"){
        this.shareBought += element.amount;
      }
      else if(element.comment=="Share Sold"){
        this.shareSold += element.amount;
      }
      else if(element.comment=="Fund Credited" || element.creditdebit=="credit"){
        this.fundCredited += element.amount;
      }
      else{
        this.fundDebited += element.amount;
      }
    });
  }

}
