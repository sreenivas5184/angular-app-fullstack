import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private element: ElementRef) { }

  @HostListener('mousedown') onMouuseClick() {
    this.element.nativeElement.style.backgroundColor = 'green';
  }
}
