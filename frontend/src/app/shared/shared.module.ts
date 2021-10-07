import { ConfirmationService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PRIMENG_IMPORTS } from './primeng-imports';
import { ModalService } from './util/modal.serivce';
import { AlertaService } from './util/alerta.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuAcoesTableComponent } from './menu-acoes-table/menu-acoes-table.component';
import { DataPipe } from './pipes/data.pipe';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    declarations: [
        MenuAcoesTableComponent,

    ],
    imports: [
        PRIMENG_IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        FieldsetModule,
    

    ],
    providers: [
        ConfirmationService,
        DialogService,
        ModalService,
        AlertaService,
    ],
    exports: [
        PRIMENG_IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        FieldsetModule,
        MenuAcoesTableComponent,
        PipesModule,

    ]
})
export class SharedModule { }
