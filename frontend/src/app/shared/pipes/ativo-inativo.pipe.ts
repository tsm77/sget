import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'ativoInativo'
})
export class AtivoInativo implements PipeTransform {

    transform(flag: boolean) {
        return flag == true ? "Ativo" : "Inativo";
    }
}