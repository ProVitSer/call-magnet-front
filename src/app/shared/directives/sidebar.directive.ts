import { Directive, HostListener, ChangeDetectorRef, OnInit, OnDestroy, HostBinding, Input, AfterViewInit } from '@angular/core';
import { SidebarLinkDirective } from './sidebar-link.directive';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { Router } from '@angular/router';

@Directive({ selector: '[appSidebar]' })
export class SidebarDirective implements OnInit, AfterViewInit, OnDestroy {
    @HostBinding('class.expanded')
    @Input()
    get navExpanded(): boolean {
        return this._navExpanded;
    }
    set navExpanded(value: boolean) {
        this._navExpanded = value;
    }

    protected navlinks: Array<SidebarLinkDirective> = [];
    layoutSub: Subscription;
    public config: any = {};
    mouseEnter = false;
    sidebarExpanded = true;
    protected _navExpanded: boolean;
    protected innerWidth: any;

    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private configService: ConfigService,
        private layoutService: LayoutService,
    ) {
        this.config = this.configService.templateConf;
        this.sidebarExpanded = !this.config.layout.sidebar.collapsed;
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.loadLayout();
            this.cdr.markForCheck();
        });
    }

    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }

    loadLayout() {
        this.sidebarExpanded = !this.config.layout.sidebar.collapsed;
        if (this.config.layout.sidebar.collapsed && !this.mouseEnter) {
            this.setSidebarGroupActiveCollapsed();
            this.navExpanded = false;
        } else {
            this.setSidebarGroupActive();
            this.navExpanded = true;
        }
    }

    public addLink(link: SidebarLinkDirective): void {
        this.navlinks.push(link);
    }

    public closeOtherLinks(openLink: SidebarLinkDirective): void {
        this.navlinks.forEach((link: SidebarLinkDirective) => {
            if (link != openLink && (openLink.level.toString() === '1' || link.level === openLink.level)) {
                link.open = false;
                link.sidebarGroupActive = false;
            } else if (link === openLink && openLink.level.toString() === '1' && link.hasSub === true) {
                link.sidebarGroupActive = true;
            } else if (link === openLink && openLink.level.toString() === '1' && link.hasSub === false) {
                link.sidebarGroupActive = false;
                link.open = false;
            } else if (link === openLink && openLink.level.toString() != '1' && link.hasSub === false) {
                link.open = false;
                link.sidebarGroupActive = false;
                return;
            }
        });
    }

    ngAfterViewInit() {}

    public setSidebarGroupActive(): void {
        if (this.navlinks.length > 0) {
            this.navlinks.forEach((link: SidebarLinkDirective) => {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
            });
            const matched = this.navlinks.find((link) => link.path === this.router.url);
            if (matched) {
                const parent = this.navlinks.find(
                    (link) => link.parent === matched.parent && link.level.toString() === '1' && link.hasSub === true,
                );
                if (parent) {
                    parent.sidebarGroupActive = true;
                    parent.navCollapsedOpen = false;
                    parent.open = true;
                }
            }
        }
    }

    public setSidebarGroupActiveCollapsed(): void {
        this.closeOtherLinks(this.navlinks.find((link) => link.path === this.router.url));
        if (this.navlinks.length > 0) {
            this.navlinks.forEach((link: SidebarLinkDirective) => {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
            });
            const matched = this.navlinks.find((link) => link.path === this.router.url);
            if (matched) {
                const parent = this.navlinks.find(
                    (link) => link.parent === matched.parent && link.level.toString() === '1' && link.hasSub === true,
                );
                if (parent) {
                    parent.sidebarGroupActive = true;
                    parent.navCollapsedOpen = true;
                    parent.open = false;
                }
            }
        }
    }

    @HostListener('mouseenter', ['$event'])
    onMouseOver(e: any) {
        this.mouseEnter = true;
        if (this.config.layout.sidebar.collapsed) {
            this.setSidebarGroupActive();
            this.navExpanded = true;
        }
    }

    @HostListener('mouseleave', ['$event'])
    onMouseOut(e: any) {
        this.mouseEnter = false;
        if (this.config.layout.sidebar.collapsed) {
            this.setSidebarGroupActiveCollapsed();
            this.navExpanded = false;
        }
    }
}
