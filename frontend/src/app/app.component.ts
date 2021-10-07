import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild, OnInit, NgZone } from '@angular/core';
import { ScrollPanel } from 'primeng/scrollpanel';
import { MenusService } from '@nuvem/primeng-components';
import { PrimeNGConfig } from 'primeng/api';
import { Login } from './views/usuario/models/login';
import { Usuario } from './views/usuario/models/usuario';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {
    usuarioLogado : Login;

    admin: Usuario;

    config = {
        topbarTheme: 'green',
        menuTheme: 'light',
        layoutMode: 'light',
        menuMode: 'static',
        inlineMenuPosition: 'bottom',
        inputStyle: 'filled',
        ripple: true,
        isRTL: false,
    };

    darkMenu = false;

    profileMode = 'inline';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    rightPanelActive: boolean;

    rightPanelClick: boolean;

    layoutContainer: HTMLDivElement;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: string;

    viewMaxWidth = 1024;

    viewMinWidth = 640;

    menuActive: boolean;

    mobileMenuActive: boolean;

    mobileTopbarActive: boolean;

    documentClickListener: () => void;

    @ViewChild('layoutContainer', { static: true }) layourContainerViewChild: ElementRef;

    @ViewChild('scrollPanel', { static: true }) layoutMenuScrollerViewChild: ScrollPanel;

    constructor(
        public renderer: Renderer2,
        public zone: NgZone,
        public menuService: MenusService,
        private primengConfig: PrimeNGConfig) { }

    ngOnInit() {

        this.menuActive = this.menuService.isStatic() && !this.menuService.isMobile;
        this.primengConfig.ripple = true;
        this.menuService.itens = [
            {
                label: 'Menu', icon: 'pi pi-fw pi-home', routerLink: ['/'], items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Produtos', icon: 'pi pi-list', items: [
                        { label: 'Listar Produtos', icon: 'pi pi-list', routerLink: ['/produto/produtos'] }
                    ]},
                    {   label: 'Usuario', icon: 'pi pi-list', items: [
                        { label: 'Listar Usuarios', icon: 'pi pi-list', routerLink: ['/usuario/usuarios'] }
                    ]}
                ],
            },
        ];
    }
    logarUsuario(usuario){
        this.usuarioLogado = usuario;
    }

    onRippleChange(event) {
        this.config.ripple = event.checked;
        this.primengConfig.ripple = event.checked;
    }

    selectorMatches(el, selector) {
        const p = Element.prototype;
        const f = p['matches'] || p['webkitMatchesSelector'] || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(el, selector);
    }

    isVisible(el) {
        return !!(el.offsetWidth || el.offsetHeight);
    }

    rippleEffect(element, e) {
        if (element.querySelector('.ink') === null) {
            const inkEl = document.createElement('span');
            this.addClass(inkEl, 'ink');

            if (this.hasClass(element, 'ripplelink') && element.querySelector('span')) {
                element.querySelector('span').insertAdjacentHTML('afterend', '<span class=\'ink\'></span>');
            } else {
                element.appendChild(inkEl);
            }
        }

        const ink = element.querySelector('.ink');
        this.removeClass(ink, 'ripple-animate');

        if (!ink.offsetHeight && !ink.offsetWidth) {
            const d = Math.max(element.offsetWidth, element.offsetHeight);
            ink.style.height = `${d}px`;
            ink.style.width = `${d}px`;
        }
        const haltOperator = 2;
        const x = e.pageX - this.getOffset(element).left - (ink.offsetWidth / haltOperator);
        const y = e.pageY - this.getOffset(element).top - (ink.offsetHeight / haltOperator);

        ink.style.top = `${y}px`;
        ink.style.left = `${x}px`;
        ink.style.pointerEvents = 'none';
        this.addClass(ink, 'ripple-animate');
    }

    hasClass(element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp(`(^| )${className}( |$)`, 'gi').test(element.className);
        }
    }

    addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ` ${className}`;
        }
    }

    removeClass(element: Element, className: string) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
        }
    }

    getOffset(el: Element) {
        const rect = el.getBoundingClientRect();

        return {
            top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
            left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
        };
    }

    ngAfterViewInit() {
        this.documentClickListener = this.renderer.listen('body', 'click', () => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.menuClick && (this.menuService.isHorizontal() || this.menuService.isSlim())) {
                this.menuService.reset();
            }

            if (!this.menuClick) {
                if (this.mobileMenuActive) {
                    this.mobileMenuActive = false;
                }

                if (this.menuService.isOverlay()) {
                    this.menuActive = false;
                }

                this.menuService.menuHoverActive = false;
                this.unblockBodyScroll();
            }

            this.topbarItemClick = false;
            this.menuClick = false;
        });
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.menuService.isHorizontal() || this.menuService.isSlim()) {
                this.menuService.resetMenu = true;
            }

            if (this.menuService.overlayMenuActive || this.menuService.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuService.menuHoverActive = false;
        }

        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }

    onMenuButtonClick(event) {
        this.menuActive = !this.menuActive;
        this.topbarMenuActive = false;
        this.menuClick = true;

        if (this.menuService.isDesktop) {
            this.menuService.staticMenuDesktopInactive = !this.menuService.staticMenuDesktopInactive;
        } else {
            this.mobileMenuActive = !this.mobileMenuActive;
            if (this.mobileMenuActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.menuService.resetMenu = false;
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.menuService.overlayMenuActive = false;
        this.menuService.staticMenuMobileActive = false;
    }

    onTopbarMobileButtonClick(event) {
        this.mobileTopbarActive = !this.mobileTopbarActive;
        event.preventDefault();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
}
