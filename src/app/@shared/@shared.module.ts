import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatoEnlaceComponent } from './formato-enlace/formato-enlace.component';
import { FormatoEnlaceService } from './formato-enlace/formato-enlace.service';



@NgModule({
  declarations: [
    FormatoEnlaceComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    FormatoEnlaceService
  ]
})
export class SharedModule { }
