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
import { StockTableMatComponent } from './Tables/stock-table-mat/stock-table-mat.component';
import { StockGraphComponent } from './stock-graph/stock-graph.component';
import { BankTableMatComponent } from './Tables/bank-table-mat/bank-table-mat.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { HomeScreenTableMatComponent } from './Tables/home-screen-table-mat/home-screen-table-mat.component';
import { Analytics1Component } from './Analytics/analytics1/analytics1.component';
import { DocumentsComponent } from './Documents/documents/documents.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingleComponent,
    MultipleComponent,
    StockTableMatComponent,
    StockGraphComponent,
    BankTableMatComponent,
    AddTransactionComponent,
    HomeScreenTableMatComponent,
    Analytics1Component,
    DocumentsComponent
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
