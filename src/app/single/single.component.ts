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
  showContent:boolean = true;

  data:any;
  datacopy:any; //one bug here
  loadingTable:boolean = false

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());


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

  updateDateClicked(){
    this.updateDateClick ? this.updateDateClick = false : this.updateDateClick = true;
  }

}