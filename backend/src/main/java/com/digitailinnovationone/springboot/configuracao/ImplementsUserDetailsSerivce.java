package com.digitailinnovationone.springboot.configuracao;

import com.digitailinnovationone.springboot.dominio.Usuario;
import com.digitailinnovationone.springboot.repositorio.UsuarioRepositorio;
import com.digitailinnovationone.springboot.servico.mapper.UsuarioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ImplementsUserDetailsSerivce implements UserDetailsService {

    @Autowired
    private UsuarioRepositorio repositorio;
    @Autowired
    private UsuarioMapper mapper;


    @Override
    public UserDetails loadUserByUsername(String nome) throws UsernameNotFoundException {
        Usuario usuario = Optional.ofNullable(repositorio.findByNome(nome))
                .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));
        return mapper.toUserDetails(usuario);
    }
}
