import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStockHighlight]'
})
export class StockHighlightDirective implements OnChanges {

  constructor(private el : ElementRef, private renderer: Renderer2) { }

    @Input() appStockHighlight!: number;
    

    ngOnChanges(changes: SimpleChanges): void {
    if ('appStockHighlight' in changes) {
      this.applyColor(this.appStockHighlight);
    }
  }
    private applyColor(appStockHighlight: number): void {
    let color = '';
    if (appStockHighlight > 20) {
      color = 'green';
    } else if (appStockHighlight >= 10) {
      color = '#FFE424';
    } else if (appStockHighlight < 10) {
      color = 'red';
    }

    this.renderer.setStyle(this.el.nativeElement, 'color', color);

  }
}