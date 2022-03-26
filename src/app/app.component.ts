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
  items:string[] |undefined;
  item:string | undefined

  constructor(private service: AppService) {
  }

  ngOnInit(): void {
    this.getDropDownItem();
  }

  clickedItem(value:string){
    console.log('clickedItem',value);

    this.service.countItem(value).subscribe(
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

    getDropDownItem(){

    this.service.getDropDownItem().subscribe(
      (res) => {
        console.log('hii',res)
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
}
