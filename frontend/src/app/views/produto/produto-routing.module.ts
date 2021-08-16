import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormularioComponent } from "./formulario/formulario.component";
import { ListagemComponent } from "./listagem/listagem.component";


const routes: Routes = [
    {
        path: 'produtos',
        component: ListagemComponent
    },
    {
        path: 'formulario', 
        component: FormularioComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutoRoutingModule { }
