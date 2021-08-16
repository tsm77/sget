import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { LoginComponent } from './login/login.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [FormularioUsuarioComponent, LoginComponent, ListagemUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
  ],
  exports:[
    LoginComponent,
  ]
})
export class UsuarioModule { }
