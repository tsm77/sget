package com.digitailinnovationone.springboot.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table (name = "produto")
@Getter
@Setter
public class Produto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_produto")
    @SequenceGenerator(name = "sq_produto", allocationSize = 1, sequenceName = "sq_produto", initialValue = 1)

    @Column (name = "id")
    private Integer id;

    @Column (name = "nome")
    private String nome;

    @Column (name = "preco")
    private Double preco;

    @Column (name = "descricao")
    private String descricao;

    @Column (name = "quantidade")
    private Integer quantidade;
}
