import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() addTransaction = new EventEmitter<string>()

  lastLoggedInTime:any = undefined;
  constructor(private service: HeaderService) {
  }
  
  ngOnInit(): void {
    this.getLastLoginTime();
  }



  getLastLoginTime() {
    this.service.getLastLoginTime().subscribe(
      (res) => {
        if(res.status=='success'){
          this.lastLoggedInTime = res.message
        }
        else{
          this.lastLoggedInTime = 'error'

        }
      },
      (err) => {
        this.lastLoggedInTime=err.message
      });
  }

  sentData(data:string){
    console.log('event emitted')
    this.addTransaction.emit(data);

  }



}
