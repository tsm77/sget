import { ConfirmationService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PRIMENG_IMPORTS } from './primeng-imports';
import { AtivoInativo } from './pipes/ativo-inativo.pipe';
import { ModalService } from './util/modal.serivce';
import { AlertaService } from './util/alerta.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    declarations: [
        AtivoInativo
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
        AlertaService
    ],
    exports: [
        PRIMENG_IMPORTS,
        FormsModule,
        ReactiveFormsModule,
        FieldsetModule
    ]
})
export class SharedModule { }
