import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, PageRoutingModule, SharedModule],
})
export class PageModule {}
