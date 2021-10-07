import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoRoutingModule } from './produto-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListagemComponent } from './listagem/listagem.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalharProdutoComponent } from './detalhar-produto/detalhar-produto.component';



@NgModule({
  declarations: [ListagemComponent, FormularioComponent, DetalharProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FormularioComponent,
  ],
  providers:[DynamicDialogConfig, DynamicDialogRef]
})
export class ProdutoModule { }
