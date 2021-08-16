import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppTopbarComponent } from './components/topbar/app.topbar.component';
import { AppFooterComponent } from './components/footer/app.footer.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotificationModule, BreadcrumbModule, MenuModule, ErrorStackModule } from '@nuvem/primeng-components';
import { ErrorModule, SecurityModule, VersionTagModule } from '@nuvem/angular-base';
import { PRIMENG_IMPORTS } from './shared/primeng-imports';
import { MensagensUtil } from './shared/util/mensagens.util';
import { BlockUIModule } from 'ng-block-ui';
import { AuthInterceptor } from './components/auth/interceptor';
import { TableModule } from 'primeng/table';
import { UsuarioModule } from './views/produto/usuario/usuario.module';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    declarations: [
        AppComponent,
        AppTopbarComponent,
        AppFooterComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        PageNotificationModule,
        UsuarioModule,
        FieldsetModule,
        BreadcrumbModule,
        ErrorStackModule,
        VersionTagModule.forRoot(environment),
        SecurityModule.forRoot(environment.auth),
        MenuModule,
        TableModule,
        ErrorModule,
        PRIMENG_IMPORTS,
        BlockUIModule.forRoot({
            message: MensagensUtil.BLOCKUI_CARREGANDO
          }
        ),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
