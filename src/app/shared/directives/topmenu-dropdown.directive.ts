import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopMenuLinkDirective } from './topmenu-link.directive';

@Directive({
    selector: '[appTopMenuDropdown]',
})
export class TopMenuDropdownDirective implements OnInit {
    protected navlinks: Array<TopMenuLinkDirective> = [];

    public ngOnInit(): any {}

    constructor(private router: Router) {}
}
