import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private e1:ElementRef, private r1:Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.r1.addClass(this.e1.nativeElement,'highlight');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.r1.removeClass(this.e1.nativeElement,'highlight');
  }
}
