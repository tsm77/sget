import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs/operators';
import { DateUtil } from 'src/app/shared/util/date-util';
import { MensagensUtil } from 'src/app/shared/util/mensagens.util';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.css']
})
export class VisualizarUsuarioComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  usuario = new Usuario;
  idUsuario: number;


  constructor(private ddr: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private service: UsuarioService,) {
    this.idUsuario = config.data;
  }

  ngOnInit(): void {
    this.obterUsuarioPorId();
      
  }

  obterUsuarioPorId() {
    this.blockUI.start(MensagensUtil.BLOCKUI_CARREGANDO)
    this.service.obterPorId(this.idUsuario).pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.usuario = res;
      });
  }

  fecharModal(value?: any): void {
    this.ddr.close(value);
  }

}
