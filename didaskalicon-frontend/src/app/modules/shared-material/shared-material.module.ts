import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatGridListModule,
    MatGridTile,
    MatCardModule
  ], exports: [
    MatGridListModule,
    MatGridTile,
    MatCardModule
  ]
})
export class SharedMaterialModule { }
