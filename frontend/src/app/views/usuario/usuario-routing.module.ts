import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormularioUsuarioComponent } from "./formulario-usuario/formulario-usuario.component";
import { ListagemUsuarioComponent } from "./listagem-usuario/listagem-usuario.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
        path : 'formulario',
        component: FormularioUsuarioComponent
    },

    {
        path: 'usuarios',
        component: ListagemUsuarioComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule { }
