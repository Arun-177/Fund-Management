import {Component, Input, OnInit,SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {SingleService} from './single.service'

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})


export class SingleComponent implements OnInit {
  @Input() item:any;
  @Input() category:any;
  oldItem:string | undefined;
  addTranscationClick:boolean = false;
  filtersClick:boolean = false;
  updateDateClick:boolean = false;
  docsClick:boolean = false;
  analyticsClick:boolean = false;
  docsData:any | undefined;
  showDocs:boolean = false;
  showContent:boolean = true;

  data:any;
  datacopy:any; //one bug here
  loadingTable:boolean = false
  totalSpending:number =0;
  totalEarning:number =0;

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  docsText = new FormControl();


  constructor(private service: SingleService) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.firstChange && this.oldItem != this.item){
      
      this.getData();
      this.oldItem = this.item;
    }

  }

  
  getData(sdate?:any,edate?:any){ 
    console.log('single.component.ts getData() called',sdate,edate)
    this.loadingTable = true;
    const dt = new Date();
    let startDate = Number(new Date(dt.getFullYear(),dt.getMonth()))+1;
    // const startDate =0;
    let endDate = Number(new Date(dt.getFullYear(),dt.getMonth()+1))-1;      
    // console.log(startDate,endDate)
    if(sdate && edate){
      startDate = Number(new Date(sdate));
      endDate= Number(new Date(edate));
    }
    this.service.getData(this.item,startDate,endDate).subscribe(
      (res) => {
        if(res.status=='success'){          
          this.data = res.message
          this.datacopy = res.message
          this.data.forEach((element:any)=>{
            (element.creditdebit=='credit' || element.creditdebit=='sell') ? this.totalEarning+=element.amount : this.totalSpending+=element.amount
          })
          console.log('data updated in single.compoent.ts - ',this.data)
          this.loadingTable = false;
        }
        else{
          this.data = undefined
        }
      },
      (err) => {
        this.data=undefined;
      });

  };


  AddTransactionClicked(){
    this.addTranscationClick ? this.addTranscationClick = false : this.addTranscationClick = true;
    this.showContent ? this.showContent = false : this.showContent = true;
  }

  filtersClicked(){
    this.filtersClick ? this.filtersClick = false : this.filtersClick = true;
  }

  analyticsClicked(){
    this.analyticsClick ? this.analyticsClick = false : this.analyticsClick = true;
    this.showContent ? this.showContent = false : this.showContent = true;


  }

  updateDateClicked(){
    this.updateDateClick ? this.updateDateClick = false : this.updateDateClick = true;
  }
  docsClicked(){
    this.docsClick ? this.docsClick = false : this.docsClick = true;

  }
  docsSubmit(key:any){
    console.log('in docsSubmit - ',key)
    this.service.getDocsData(key,this.category,this.item).subscribe(
      (res) => {
        if(res.status=='success'){          
          this.docsData = res.message;
          this.showContent = false;
          this.showDocs = true;
        }
        else{
          this.docsData = undefined
        }
      },
      (err) => {
        this.docsData=undefined;
      });

  }
  docsGoBack(){
    this.showContent = true;
    this.showDocs = false;
    this.docsClick ? this.docsClick = false : this.docsClick = true;

  }

}