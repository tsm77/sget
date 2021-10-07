import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { MenuAcoesTableComponent } from 'src/app/shared/menu-acoes-table/menu-acoes-table.component';
import { Acao, AcaoEnumMapper, AcaoOptionsEnum } from 'src/app/shared/util/acao';
import { AlertaService } from 'src/app/shared/util/alerta.service';
import { MensagensUtil } from 'src/app/shared/util/mensagens.util';
import { ModalService } from 'src/app/shared/util/modal.serivce';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';
import { TokenStorageService } from '../service/token-storage.service';
import { UsuarioService } from '../service/usuario.service';
import { VisualizarUsuarioComponent } from '../visualizar-usuario/visualizar-usuario.component';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.css']
})
export class ListagemUsuarioComponent implements OnInit {

  @ViewChild("tabela", { static: true }) datatable: Table;


  @BlockUI() blockUI: NgBlockUI;

  usuarios: Usuario[] = [];

  usuario = new Usuario();

  menuSelected: MenuAcoesTableComponent;

  usuarioLogado: Usuario;

  acoes = Acao.options;

  acoesMenu: any[] = [];

  acaoMapper = AcaoEnumMapper;

  constructor(private usaurioService: UsuarioService,
     private modalService: ModalService,
     private confirmationService: ConfirmationService,
     private tokenService: TokenStorageService,
     private alertaService: AlertaService) { }

  cols = [
    { field: 'nome', text: true, header: 'Nome', sortField: 'nome.sort' },
    { field: 'email', text: true, header: 'Email', sortField: 'email.sort' },

  ];

  ngOnInit(): void {    
    this.search();
    this.buscarUsuario();
    
  }

  search() {
    this.blockUI.start(MensagensUtil.BLOCKUI_CARREGANDO);
    this.usaurioService.buscar()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(response => {
        this.usuarios = response
      });

  }

  buscarUsuario(){
    this.usuarioLogado = this.tokenService.getUser();
  }

  excluir(id: number) {
    this.confirmationService.confirm({
      message: MensagensUtil.CONFIRMAR_EXCLUSAO_USUARIO,
      header: 'Excluir Usuario',
      icon: 'pi pi-times',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.blockUI.start(MensagensUtil.BLOCKUI_EXCLUINDO);
        this.usaurioService.deletar(id)
          .pipe(finalize(() => this.blockUI.stop())).subscribe(() => {
            this.alertaService.sucesso(MensagensUtil.SUCESSO);
            this.search();
          });
      }
    });
  }

  abrirModalIncluir() {
    const modal = this.modalService.modalComponente(FormularioUsuarioComponent);
    modal.onClose.subscribe(() => {
      this.search();
    });
  }

  abrirModalAlterar(id: number) {
    const modal = this.modalService.modalComponente(FormularioUsuarioComponent, null, id);
    modal.onClose.subscribe(() => {
      this.search();
    });
  }


  abrirModalDetalhar(id: number) {
    const modal = this.modalService.modalComponente(VisualizarUsuarioComponent, null, id);
    modal.onClose.subscribe(() => {
      this.search();
    });
  }

  preencheAcoesMenu(rowData: Usuario, menuAcoes: MenuAcoesTableComponent) {
    this.acoesMenu = [];
    this.menuSelected = menuAcoes;

    const visualizar = this.acaoMapper[AcaoOptionsEnum.VISUALIZAR];
    const editar = this.acaoMapper[AcaoOptionsEnum.EDITAR];
    const excluir = this.acaoMapper[AcaoOptionsEnum.EXCLUIR];

    this.acoesMenu.push({
        ...visualizar,
        command: () => {
          this.abrirModalDetalhar(rowData.id);
      
        }
    });
    this.acoesMenu.push({
        ...excluir,
        command: () => {
            this.excluir(rowData.id);
        }
    });

}

}
