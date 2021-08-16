package com.digitailinnovationone.springboot.servico.mapper;

import com.digitailinnovationone.springboot.configuracao.UserDetailsImp;
import com.digitailinnovationone.springboot.dominio.Usuario;
import com.digitailinnovationone.springboot.servico.dto.UsuarioDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface UsuarioMapper  extends EntityMapper<UsuarioDTO, Usuario>{


    @Mapping(source = "email", target = "username")
    @Mapping(source = "senha", target = "password")
    UserDetailsImp toUserDetails(Usuario usuario);

}
