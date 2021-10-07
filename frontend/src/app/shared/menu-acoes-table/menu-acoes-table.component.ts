import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-acoes-table',
  templateUrl: './menu-acoes-table.component.html',
  styleUrls: []
})
export class MenuAcoesTableComponent {

    @Input() acoes: any;
    @Input() data: any;
    @Input() menuAcoes: MenuAcoesTableComponent;
    @Input() menuSelected: MenuAcoesTableComponent;

    aberto: boolean = false;

    constructor() {}

    changeMenu() {
        this.verificaExibicaoMenu();
        this.aberto = !this.aberto;
    }

    verificaExibicaoMenu(){
        if (this.menuSelected != null && this.menuAcoes != this.menuSelected) {
            this.menuSelected.aberto = false;
        }
    }

}
