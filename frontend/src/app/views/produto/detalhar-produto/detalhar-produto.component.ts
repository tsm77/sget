import { Component, Input, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs/operators';
import { MensagensUtil } from 'src/app/shared/util/mensagens.util';
import { Produto } from '../models/produto';
import { ProdutosService } from '../service/produto.service';

@Component({
  selector: 'app-detalhar-produto',
  templateUrl: './detalhar-produto.component.html',
  styleUrls: ['./detalhar-produto.component.css']
})
export class DetalharProdutoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() ehDetalhar: boolean;
  idProduto: number;
  produto = new Produto();

  constructor(private ddr: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private service: ProdutosService) { 
    this.idProduto = config.data;
  }

  ngOnInit(): void {
  }


  obterUsuarioPorId() {
    this.blockUI.start(MensagensUtil.BLOCKUI_CARREGANDO)
    this.service.obterPorId(this.idProduto).pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.produto = res;
      });
  }

  fecharModal(value?: any): void {
    this.ddr.close(value);
  }
}
