import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';


import {routing} from "./auth.routing";
import { AuthComponent } from './auth.component';



@NgModule({
 
  imports: [
    CommonModule,

    routing,
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }

