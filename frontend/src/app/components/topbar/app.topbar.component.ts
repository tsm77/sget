import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Authentication, User } from '@nuvem/angular-base';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    animations: [
        trigger('topbarActionPanelAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' })),
            ]),
            transition(':leave', [
                animate('.1s linear', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class AppTopbarComponent {

    model: MenuItem[] = [];

    constructor(public app: AppComponent, private readonly _authentication: Authentication<User>) {
    }

    get usuario() {
        return this._authentication.getUser();
    }

    isAuthenticated() {
        return this._authentication.isAuthenticated();
    }
    logout() {
        localStorage.clear()
        location.reload()
    }
}
