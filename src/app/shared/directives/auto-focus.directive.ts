import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Timeout ensures it's called after the DOM is fully rendered
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
