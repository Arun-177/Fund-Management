import { Component,OnInit } from '@angular/core';
import {HeaderComponent} from './header/header.component'
import {AppService} from './app.service'
import { SingleComponent } from './single/single.component';
import { MultipleComponent } from './multiple/multiple.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fund-management';
  dropDownList:string[] | undefined;
  isSingle:boolean = false;
  isMultiple:boolean = false;
  isAddTransaction:boolean = false;
  items:string[] |undefined;
  item:string | undefined;
  category:string | undefined
  loadingTable:boolean =false;
  data:any;
  totalSpending:Number =0;
  totalEarning:Number =0;
  totalInvestment:Number =0;

  constructor(private service: AppService) {
  }

  ngOnInit(): void {
    this.getBranches();
    this.getHighLevelViewData();
  }
  

  clickedItem(value:string){
    this.isAddTransaction = false;
    // console.log('clickedItem',value);
    this.category = value;

    this.service.getSubCategory(value).subscribe(
      (res) => {
        if(res.status=='success'){
          if(res.count.length==1){
            this.isSingle = true;
            this.isMultiple = false;
            this.items = undefined
            this.item =res.count[0].name;

          }
          else if(res.count.length>1){
            this.isSingle = false;
            this.isMultiple = true;
            this.item = undefined
            this.items =[];
            res.count.forEach((element:any) => {this.items?.push(element.name)
              
            });
          }
        }
        else{
          // this.dropDownList = undefined

        }
      },
      (err) => {
        // this.dropDownList=undefined;
        this.isSingle = false;
        this.isMultiple = false;
      });

    
  }

    getBranches(){
      this.service.getBranches().subscribe(
        (res) => {
          // console.log('hii',res)
          if(res.status=='success'){
            this.dropDownList = res.message
          }
          else{
            this.dropDownList = undefined

          }
        },
        (err) => {
          this.dropDownList=undefined;
        });

  };

// this method will loaad add-transaction component when Add Transaction CTA happens
  addTransactionEvent(event:any){
    this.isAddTransaction = true;
    this.isSingle = false;
    this.isMultiple = false;
    console.log('event received ',event)
  }

//
  getHighLevelViewData(){
    this.loadingTable = true;
    const dt = new Date();
    const startDate = Number(new Date(dt.getFullYear(),dt.getMonth()))+1;
    const endDate = Number(new Date(dt.getFullYear(),dt.getMonth()+1))-1; 
    this.service.getHighLevelViewData(startDate,endDate).subscribe(
      (res) => {
        if(res.status=='success'){          
          this.data = res.message
          console.log('data updated in single.compoent.ts - ',this.data)
          this.data.forEach((element:any)=>{
            (element.creditdebit=='credit' || element.creditdebit=='sell') ? this.totalEarning+=element.amount :this.totalSpending+=element.amount
          })
          this.loadingTable = false;
        }
        else{
          this.data = undefined
        }
      },
      (err) => {
        this.data=undefined;
      });
  }
}
