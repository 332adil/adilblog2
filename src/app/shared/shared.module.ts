import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './shorten.pipe';
import { TempComponent } from './temp/temp.component';
import { MaterialModule } from '../material/material.module';
import { ShortenPipe2 } from './shorten2.pipe';



@NgModule({
  declarations: [
    ShortenPipe,
    ShortenPipe2,
    TempComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports : [
    ShortenPipe,
    ShortenPipe2
  ]
})
export class SharedModule { }
