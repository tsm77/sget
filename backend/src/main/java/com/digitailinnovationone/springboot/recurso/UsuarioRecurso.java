package com.digitailinnovationone.springboot.recurso;

import com.digitailinnovationone.springboot.configuracao.UserDetailsImp;
import com.digitailinnovationone.springboot.configuracao.jwt.JwtUtils;
import com.digitailinnovationone.springboot.repositorio.UsuarioRepositorio;
import com.digitailinnovationone.springboot.response.JwtResponse;
import com.digitailinnovationone.springboot.servico.Exception.RegraNegocioException;
import com.digitailinnovationone.springboot.servico.UsuarioServico;
import com.digitailinnovationone.springboot.servico.dto.UsuarioDTO;
import com.digitailinnovationone.springboot.servico.request.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor

public class UsuarioRecurso {
    private final JwtUtils jwtUtils;

    private final UsuarioServico servico;

    private final UsuarioRepositorio repositorio;

    private final AuthenticationManager authenticationManager;

    @PostMapping("/entrar")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws RegraNegocioException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getNome(),
                userDetails.getEmail(),
                userDetails.getAdmin()));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar() {
        List list = servico.listar();
        return ResponseEntity.ok(list);
    }
    @GetMapping ("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long id){
        UsuarioDTO usuarioDTO = servico.obterPorId(id);
        return ResponseEntity.ok(usuarioDTO);

    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> salvar(@Valid @RequestBody UsuarioDTO usuarioDTO) throws URISyntaxException {
        UsuarioDTO usuarios = servico.salvar(usuarioDTO);
        return ResponseEntity.created(new URI("/api/usuarios")).body(usuarios);
    }

    @PutMapping
    public ResponseEntity<Void> atualizar(@RequestBody UsuarioDTO usuarioDTO){
        servico.editar(usuarioDTO);
        return ResponseEntity.ok().build();

    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        servico.remover(id);
    }
}
