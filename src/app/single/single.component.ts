import { Component, Input, OnInit,SimpleChanges } from '@angular/core';
import {SingleService} from './single.service'

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  @Input() item:any;
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
      return date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear() + ' at ' +
      ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' + 
      ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes() + ':' + 
      ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds()
    }
    return date.getDate() + ' ' + month[date.getMonth()] + ', ' + date.getFullYear();

  }

}
