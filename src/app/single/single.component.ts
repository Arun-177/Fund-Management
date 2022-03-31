import {Component, Input, OnInit,SimpleChanges, ViewChild } from '@angular/core';
import {SingleService} from './single.service'

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})


export class SingleComponent implements OnInit {
  @Input() item:any;

  data:any;

  constructor(private service: SingleService) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
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
}