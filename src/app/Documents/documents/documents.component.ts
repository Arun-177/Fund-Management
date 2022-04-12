import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {DocumentService} from './documents.service'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @Input() item:any;
  @Input() category:any;
  @Input() docsData:any;

  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service : DocumentService) { }

  ngOnInit(): void {
    console.log(this.docsData)
    this.registerForm = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  updateDocsData(){
    console.log(this.docsData)
    console.log(this.registerForm.value)
    this.docsData[this.registerForm.value.key] = this.registerForm.value.value
    console.log(this.docsData)
    this.service.updateDocsData(this.docsData,this.category,this.item).subscribe(
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
}
