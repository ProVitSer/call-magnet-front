import { Directive, HostListener, Inject } from '@angular/core';
import { TopMenuLinkDirective } from './topmenu-link.directive';

@Directive({
    selector: '[appTopMenuAnchorToggle]',
})
export class TopMenuAnchorToggleDirective {
    protected navlink: TopMenuLinkDirective;

    constructor(@Inject(TopMenuLinkDirective) navlink: TopMenuLinkDirective) {
        this.navlink = navlink;
    }

    @HostListener('mouseenter', ['$event'])
    onMouseOver(e: any) {
        this.navlink.openDropdown();
    }
}
