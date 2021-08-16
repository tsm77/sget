package com.digitailinnovationone.springboot.repositorio;

import com.digitailinnovationone.springboot.dominio.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    Usuario findByNome(String nome);

}
