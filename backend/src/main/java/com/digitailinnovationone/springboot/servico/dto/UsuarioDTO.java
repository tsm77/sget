package com.digitailinnovationone.springboot.servico.dto;

import com.digitailinnovationone.springboot.servico.enumeration.PermissaoEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {

    private Long id;

    private String nome;

    private String email;

    private String senha;

    private PermissaoEnum role;

}
