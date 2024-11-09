import { Directive, ElementRef, AfterViewInit, Input, HostListener, NgModule } from '@angular/core';

@Directive({
    selector: '[matchHeight]',
})
export class MatchHeightDirective implements AfterViewInit {
    @Input()
    matchHeight: string;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.matchHeights(this.el.nativeElement, this.matchHeight);
        }, 300);
    }

    matchHeights(parent: HTMLElement, className: string) {
        if (!parent) return;

        const children = parent.getElementsByClassName(className);

        if (!children) return;

        Array.from(children).forEach((x: HTMLElement) => {
            x.style.height = 'initial';
        });

        const itemHeights = Array.from(children).map((x) => x.getBoundingClientRect().height);

        const maxHeight = itemHeights.reduce((prev, curr) => {
            return curr > prev ? curr : prev;
        }, 0);

        Array.from(children).forEach((x: HTMLElement) => (x.style.height = `${maxHeight}px`));
    }

    @HostListener('window:resize')
    onResize() {
        this.matchHeights(this.el.nativeElement, this.matchHeight);
    }
}

@NgModule({
    declarations: [MatchHeightDirective],
    exports: [MatchHeightDirective],
})
export class MatchHeightModule {}
