import {Component, Input, OnInit,SimpleChanges, ViewChild } from '@angular/core';
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

  data:any;
  loadingTable:boolean = false

  constructor(private service: SingleService) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if(!changes.firstChange && this.oldItem != this.item){
      // setTimeout(()=>{
      //   this.getData();
      // },10)
      this.getData();
      this.oldItem = this.item;
    }

  }

  
    getData(){
      this.loadingTable = true;
      const dt = new Date();
      const startDate = Number(new Date(dt.getFullYear(),dt.getMonth()))+1;
      // const startDate =0;
      const endDate = Number(new Date(dt.getFullYear(),dt.getMonth()+1))-1;      
      // console.log(startDate,endDate)
      this.service.getData(this.item,startDate,endDate).subscribe(
        (res) => {
          if(res.status=='success'){          
            this.data = res.message
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
}