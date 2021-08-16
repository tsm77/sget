package com.digitailinnovationone.springboot.servico.enumeration;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum PermissaoEnum {
    USUARIO("USUARIO"),
    ADMIN("ADMIN");

    private String value;
}
