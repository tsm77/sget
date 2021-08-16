package com.digitailinnovationone.springboot.servico;

import com.digitailinnovationone.springboot.dominio.Usuario;
import com.digitailinnovationone.springboot.repositorio.UsuarioRepositorio;
import com.digitailinnovationone.springboot.servico.Exception.RegraNegocioException;
import com.digitailinnovationone.springboot.servico.dto.UsuarioDTO;
import com.digitailinnovationone.springboot.servico.enumeration.PermissaoEnum;
import com.digitailinnovationone.springboot.servico.mapper.UsuarioMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioServico {

    private final UsuarioRepositorio repositorio;

    private final UsuarioMapper mapper;

    private final PasswordEncoder encoder;


    public List<UsuarioDTO> listar() {
        List<Usuario> usuarios = repositorio.findAll();
        return mapper.toDto(usuarios);
    }

    public UsuarioDTO obterPorId(Long id) {
        Usuario usuario = repositorio.findById(id).orElseThrow(()
                -> new RegraNegocioException("ID nao encontrado"));
        return mapper.toDto(usuario);
    }

    public UsuarioDTO salvar(UsuarioDTO usuarioDTO) {
        Usuario usuario = mapper.toEntity(usuarioDTO);
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        usuario.setRoles(PermissaoEnum.USUARIO);
        repositorio.save(usuario);
        return mapper.toDto(usuario);
    }


    public void editar(UsuarioDTO usuarioDTO) {
    verificarExistencia(usuarioDTO.getId());
    }

    public void verificarExistencia(Long id) {
        if (!repositorio.existsById(id)) {
            throw new RegraNegocioException("Usuario não encontrado.");
        }
    }


    public void remover(Long id) {
       verificarExistencia(id);
        repositorio.deleteById(id);
    }
}
