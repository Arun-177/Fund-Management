import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent implements OnInit {
  
  @Input() items:any;
  @Input() category:any;
  loadsingle:boolean = false;
  item:any | undefined;

  constructor() { }

  ngOnInit(): void {
  }

    clickedItem(value:string){
      this.item = value;

      this.loadsingle = true;
    
  }
}
