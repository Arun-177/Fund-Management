import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialExampleModule} from '../material.module';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingleComponent } from './single/single.component';
import {MatNativeDateModule} from '@angular/material/core';
import { MultipleComponent } from './multiple/multiple.component';
import { StockTableMatComponent } from './stock-table-mat/stock-table-mat.component';
import { StockGraphComponent } from './stock-graph/stock-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingleComponent,
    MultipleComponent,
    StockTableMatComponent,
    StockGraphComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialExampleModule,MatNativeDateModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
