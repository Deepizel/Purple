import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LocationMapperComponent } from './location-mapper/location-mapper.component';



@NgModule({
  declarations: [NavbarComponent, LocationMapperComponent],
  imports: [CommonModule],
  exports: [CommonModule, NavbarComponent, LocationMapperComponent],
})
export class SharedModule {}
