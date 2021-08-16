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
@Component({
  providers: [ConfirmationService],
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']

})
export class ListagemComponent implements OnInit {
  @ViewChild("tabela", { static: true }) datatable: Table;
  @BlockUI() blockUI: NgBlockUI;
  @Output() produtoSalvo = new EventEmitter<Produto>();
  produtos: Produto[] = [] ;
  produto = new Produto();
  display = false;
  exibir = false;
  formularioEdicao: boolean;
  linhaSelecionada : SelectItem;
  rows = 20;

  constructor(private produtoService: ProdutosService,
    private router: Router,
    private modalService: ModalService,
    private confirmationService: ConfirmationService,
    private alertaService: AlertaService,) { }

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
      .subscribe(response => { this.produtos = response
       },);
       
  }

  excluir(id: number) {
    this.confirmationService.confirm({
      message: MensagensUtil.CONFIRMAR_EXCLUSAO_REFERENCIA,
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


  mostarDialogDetails(id: number) {
    this.produtoService.obterPorId(id)
      .subscribe(produto => {
        this.produto = produto;
        this.exibir = true;

      })
  }

  abrirModalAlterar(id: number) {
    const modal = this.modalService.modalComponente(FormularioComponent, this.dimensoes, id);
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


}
