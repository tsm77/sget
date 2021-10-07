
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs/operators';

import { Produto } from '../models/produto';
import { ProdutosService } from '../service/produto.service';
import { AlertaService } from 'src/app/shared/util/alerta.service';
import { MensagensUtil } from 'src/app/shared/util/mensagens.util';
import { MensagemValidacaoUtil } from 'src/app/shared/util/mensagem-validacao.util';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],

})
export class FormularioComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  @Input() produtos: Produto =  new Produto();
  tituloModal = 'Cadastrar Produto';
  idProduto: number;
  form: FormGroup;
  @Input() ehDetalhar: boolean;

  constructor(public messageService: MessageService,
    private produtoService: ProdutosService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ddr: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private alertaService: AlertaService,
  ) {
    if (config.data) {
      this.idProduto = config.data;
      this.tituloModal = 'Produto';
      this.obterProdutoPorId();
    }
  }


  ngOnInit(): void {
    this.iniciarForm();


  }
  private iniciarForm() {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],

    });
  }

  obterProdutoPorId(): void {
    this.blockUI.start(MensagensUtil.BLOCKUI_CARREGANDO);
    this.produtoService.obterPorId(this.idProduto)
      .pipe(finalize(() => this.blockUI.stop())).subscribe(ref => {
        this.produtos = ref;

      });
  }


  salvar() {
    MensagemValidacaoUtil.validarTodosCamposDoForm(this.form);
    if (this.form.valid) {
      this.salvarProduto();
    }
  }

  obterRequisicao() {
    return this.produtos.id ?
      this.produtoService.editar(this.produtos) : this.produtoService.create(this.produtos);
  }

  salvarProduto() {
    MensagemValidacaoUtil.validarTodosCamposDoForm(this.form);
    this.blockUI.start(MensagensUtil.BLOCKUI_SALVANDO);
    this.obterRequisicao().pipe(finalize(() => this.blockUI.stop()))
      .subscribe(response => {
        this.fecharModal();
        this.alertaService.sucesso(MensagensUtil.SUCESSO);
      },
        err => {
          const msg = `O Produto ${this.produtos.nome} já possui cadastro no sistema.`;
          this.alertaService.erro(msg);
        });
  }
  fecharModal(value?: any): void {
    this.ddr.close(value);
  }
  
  mapearMensagemErroCampo(campo: string, campoControl: AbstractControl): string {
    return MensagemValidacaoUtil.construirMensagem(campo, campoControl);
}

}

