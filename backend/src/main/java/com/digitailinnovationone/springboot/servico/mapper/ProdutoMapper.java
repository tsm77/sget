package com.digitailinnovationone.springboot.servico.mapper;

import com.digitailinnovationone.springboot.dominio.Produto;
import com.digitailinnovationone.springboot.servico.dto.ProdutoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface ProdutoMapper extends EntityMapper<ProdutoDTO, Produto> {
}
