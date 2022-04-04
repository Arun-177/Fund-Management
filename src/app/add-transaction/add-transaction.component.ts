import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import {AppAddTransaction} from './add-transaction.service'

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  @Input() showSelectionOption: boolean | true; 
  @Input() isAccount: boolean | false; 
  @Input() isStock: boolean | false;

  amount:Number = 0;
  // isStock:boolean = false;
  // isAccount:boolean = false;
  constructor(private fb: FormBuilder,private service:AppAddTransaction) { }
  ngOnInit(): void {
  }

   stockForm = this.fb.group({
    date: [new Date(), Validators.required],
    name: ['', Validators.required],
    quantity: ['', Validators.required],
    price: ['', Validators.required],
    creditdebit: ['', Validators.required],
    comment: ['', Validators.required],
  });

    accountForm = this.fb.group({
    date: [new Date(), Validators.required],
    platform: ['', Validators.required],
    amount: ['', Validators.required],
    creditdebit: ['', Validators.required],
    comment: ['', Validators.required],
  });


   openForm(value:string){
     if(value=='stock'){
      this.isAccount = false;
      this.isStock = true;
     }
     else{
      this.isAccount = true;
      this.isStock = false;
     }
   }

 
  onSubmit() {
    console.log('onSubmit called')
    // TODO: Use EventEmitter with form value
    var prepareData = undefined;
    if(this.isStock){
      prepareData= this.prepareDataFunction(this.stockForm.value)
      console.warn(prepareData);
    }
    else{
      prepareData= this.prepareDataFunction(this.stockForm.value)
      console.warn(prepareData);
    }

    this.service.insertData([prepareData]).subscribe(
        (res) => {
          if(res.status=='success'){          
            console.log(res.message)
          }
          else{
            console.log(res.message)

          }
        },
        (err) => {            
          console.log(err)

        });

  }

  prepareDataFunction(data:any){
    if(this.isStock){
      return {
        date : Number(new Date(this.stockForm.value.date)),
        name : this.stockForm.value.name,
        quantity : this.stockForm.value.quantity,
        price : this.stockForm.value.price,
        amount : this.stockForm.value.quantity * this.stockForm.value.price,
        creditdebit : this.stockForm.value.creditdebit,
        comment : this.stockForm.value.comment,
      }
    } else{
      return {
        date : Number(new Date(this.accountForm.value.date)),
        platform : this.accountForm.value.name,
        amount : this.accountForm.value.amount,
        creditdebit : this.accountForm.value.creditdebit,
        comment : this.accountForm.value.comment,
      }
    }

  }

}
