import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionComponent, ModalComponent, HeaderComponent, FooterComponent, SidebarComponent } from './components';
import { AutoFocusDirective } from './directives';
import { CapitalizePipe } from './pipes';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    AccordionComponent, 
    ModalComponent, 
    AutoFocusDirective, 
    CapitalizePipe, 
    SidebarComponent
  ],
  imports: [
    CommonModule, 
    RouterModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    AccordionComponent, 
    ModalComponent, 
    AutoFocusDirective, 
    CapitalizePipe, 
    SidebarComponent
  ]
})
export class SharedModule { }
