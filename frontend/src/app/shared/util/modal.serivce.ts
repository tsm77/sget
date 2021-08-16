import { Injectable } from "@angular/core";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable()
export class ModalService {

  constructor(private dialogService: DialogService) { }

  /**
   * Retorna um @DynamicDialogRef
   * utitlizar o método @onClose para o retorno do dialog
   * utilizar o método .destroy() para fechar o dialog
   */
  modalComponente(componente: any, dimensoes?: { altura: string; largura: string; }, obj?: Object): DynamicDialogRef {
    return this.dialogService.open(componente, {
      width: dimensoes ? dimensoes.largura : '55%' ,
      height: dimensoes ? dimensoes.altura : 'auto',
      baseZIndex: 10000,
      showHeader: false,
      data: obj ? obj : null,
    });
  }

}
