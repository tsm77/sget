package com.digitailinnovationone.springboot.repositorio;

import com.digitailinnovationone.springboot.dominio.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ProdutoRepositorio extends JpaRepository<Produto, Integer> {
    Produto findByNome(String nome);
}
