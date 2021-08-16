import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';



@Injectable()

export class AlertaService {

  constructor(
    private messageService: MessageService,
  ) { }

  sucesso(mensagem: string) {
    this.messageService.add({ severity: 'success', summary: mensagem });
  }

  erro(mensagem: string, chave?: string) {
    this.messageService.add({
      severity: 'error', summary: 'Erro', detail: mensagem, key: chave
    });
  }


}
