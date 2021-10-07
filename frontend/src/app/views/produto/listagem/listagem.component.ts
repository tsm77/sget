import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { MensagensUtil } from 'src/app/shared/util/mensagens.util';
import { AlertaService } from 'src/app/shared/util/alerta.service';
import { ModalService } from 'src/app/shared/util/modal.serivce';
import { Produto } from '../models/produto';
import { ProdutosService } from '../service/produto.service';
import { FormularioComponent } from '../formulario/formulario.component';
import { Table } from 'primeng/table';
import { MenuAcoesTableComponent } from 'src/app/shared/menu-acoes-table/menu-acoes-table.component';
import { Acao, AcaoEnumMapper, AcaoOptionsEnum } from 'src/app/shared/util/acao';
import { DetalharProdutoComponent } from '../detalhar-produto/detalhar-produto.component';
@Component({

  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']

})
export class ListagemComponent implements OnInit {
  @ViewChild("tabela", { static: true }) datatable: Table;
  @BlockUI() blockUI: NgBlockUI;
  @Output() produtoSalvo = new EventEmitter<Produto>();
  produtos: Produto[] = [];
  produto = new Produto();
  display = false;
  exibir = false;
  idProduto: number;
  formularioEdicao: boolean;
  linhaSelecionada: SelectItem;
  rows = 20;
  menuSelected: MenuAcoesTableComponent;



  acoes = Acao.options;

  acoesMenu: any[] = [];

  acaoMapper = AcaoEnumMapper;

  constructor(private produtoService: ProdutosService,
    private router: Router,
    private modalService: ModalService,
    private confirmationService: ConfirmationService,
    private alertaService: AlertaService) {}
  

  ngOnInit(): void {
  
    this.search()

  }
  cols = [
    { field: 'nome', text: true, header: 'Nome', sortField: 'nome.sort' },
    { field: 'descricao', text: true, header: 'Descrição', sortField: 'descricao.sort' },
    { field: 'preco', text: true, header: 'Preço', sortField: 'preco.sort' },
    { field: 'quantidade', text: true, header: 'Quantidade', sortField: 'quantidade.sort' },
  ];


  dimensoes = {
    altura: 'auto',
    largura: '50%'
  };

  search() {
    this.blockUI.start(MensagensUtil.BLOCKUI_CARREGANDO);
    console.log(this.blockUI.start())
    this.produtoService.getProduto()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(response => {
        this.produtos = response
      });

  }

  excluir(id: number) {
    this.confirmationService.confirm({
      message: MensagensUtil.CONFIRMAR_EXCLUSAO_PRODUTO,
      header: 'Excluir Produto',
      icon: 'pi pi-times',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.blockUI.start(MensagensUtil.BLOCKUI_EXCLUINDO);
        this.produtoService.deletar(id)
          .pipe(finalize(() => this.blockUI.stop())).subscribe(() => {
            this.alertaService.sucesso(MensagensUtil.SUCESSO);
            this.search();
          });
      }
    });
  }

  abrirModalAlterar(id: number) {
    const modal = this.modalService.modalComponente(FormularioComponent, null, id);
    modal.onClose.subscribe(() => {
      this.search();
    });
  }

  abrirModalDetalhar(id: number) {
    const modal = this.modalService.modalComponente(DetalharProdutoComponent, null, id);
    modal.onClose.subscribe(() => {
      this.search();
    });
  }



  abrirModalIncluir() {
    const modal = this.modalService.modalComponente(FormularioComponent);
    modal.onClose.subscribe(() => {
      this.search();
    });
  }

  preencheAcoesMenu(rowData: Produto, menuAcoes: MenuAcoesTableComponent) {
    this.acoesMenu = [];
    this.menuSelected = menuAcoes;

    const visualizar = this.acaoMapper[AcaoOptionsEnum.VISUALIZAR];
    const editar = this.acaoMapper[AcaoOptionsEnum.EDITAR];
    const excluir = this.acaoMapper[AcaoOptionsEnum.EXCLUIR];

    this.acoesMenu.push({
        ...visualizar,
        command: () => {
          this.abrirModalDetalhar(rowData.id)
      
        }
    });
    this.acoesMenu.push({
        ...editar,
        command: () => {
            this.abrirModalAlterar(rowData.id)
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
