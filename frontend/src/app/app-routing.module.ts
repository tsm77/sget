import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorStackComponent } from '@nuvem/primeng-components';
import { LoginSuccessComponent } from '@nuvem/angular-base';
import { ProdutoModule } from './views/produto/produto.module';
import { UsuarioModule } from './views/produto/usuario/usuario.module';

const routes: Routes = [
    { path: 'error-stack', component: ErrorStackComponent, data: { breadcrumb: 'Diário de Erros'} },
    { path: 'login-success', component: LoginSuccessComponent },
    { path: 'produto', loadChildren: () => ProdutoModule },
    { path: 'usuario', loadChildren: () => UsuarioModule}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
