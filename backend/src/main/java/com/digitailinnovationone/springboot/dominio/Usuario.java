package com.digitailinnovationone.springboot.dominio;

import com.digitailinnovationone.springboot.servico.enumeration.PermissaoEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table (name = "usuario")
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "sq_usuario")
    @SequenceGenerator(name = "sq_usuario", allocationSize = 1, sequenceName = "sq_usuario", initialValue = 1)
    @Column(name = "id")
    private Long id;

    @Column (name = "nome")
    private String nome;

    @Column (name = "senha")
    @JsonIgnore
    private String senha;

    @Column (name ="email")
    private String email;

    @Column(name = "permissao_usuario")
    @Enumerated(EnumType.STRING)
    private PermissaoEnum roles;

}
