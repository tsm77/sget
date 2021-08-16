package com.digitailinnovationone.springboot.servico.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ProdutoDTO {

    private Integer id;

    @NotNull
    private String nome;

    @NotNull
    private Double preco;

    @NotNull
    private String descricao;

    @NotNull
    private Integer quantidade;
}
