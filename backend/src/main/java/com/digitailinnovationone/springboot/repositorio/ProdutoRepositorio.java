package com.digitailinnovationone.springboot.repositorio;

import com.digitailinnovationone.springboot.dominio.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepositorio extends JpaRepository<Produto, Long> {
    Produto findByNome(String nome);
}
