import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarLinkDirective } from './sidebar-link.directive';

@Directive({
    selector: '[appSidebarDropdown]',
})
export class SidebarDropdownDirective implements OnInit {
    protected navlinks: Array<SidebarLinkDirective> = [];

    public ngOnInit(): any {}

    constructor(private router: Router) {}
}
