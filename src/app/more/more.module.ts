import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { LicenseComponent } from './license/license.component';
import { FAQsComponent } from './faqs/faqs.component';
import { LegalComponent } from './legal/legal.component';



@NgModule({
  declarations: [AboutComponent, LicenseComponent, FAQsComponent, LegalComponent],
  imports: [
    CommonModule
  ]
})
export class MoreModule { }
