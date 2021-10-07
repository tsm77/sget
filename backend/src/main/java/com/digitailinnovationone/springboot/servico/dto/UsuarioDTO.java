package com.digitailinnovationone.springboot.servico.dto;

import com.digitailinnovationone.springboot.servico.enumeration.PermissaoEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UsuarioDTO {

    private Long id;

    private String nome;

    private String email;

    private String senha;

    private Boolean admin;

}
