package com.digitailinnovationone.springboot.recurso;

import com.digitailinnovationone.springboot.servico.ProdutoServico;
import com.digitailinnovationone.springboot.servico.dto.ProdutoDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
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
@Configuration
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
@Slf4j
public class ProdutoRecurso {

    private final ProdutoServico produtoServico;

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> listar() {
        List list = produtoServico.listar();
        return ResponseEntity.ok(list);
    }
    @GetMapping ("/{id}")
    public ResponseEntity<ProdutoDTO> buscar(@PathVariable Long id){
        ProdutoDTO produtoDTO = produtoServico.obterPorId(id);
        return ResponseEntity.ok(produtoDTO);

    }


    @PostMapping
    public ResponseEntity<ProdutoDTO> inserir(@Valid @RequestBody ProdutoDTO produtoDTO) throws URISyntaxException {
        ProdutoDTO produtos = produtoServico.salvar(produtoDTO);
        return ResponseEntity.created(new URI("/api/produtos")).body(produtos);

    }
    @PutMapping
    public ResponseEntity<ProdutoDTO> atualizar(@RequestBody ProdutoDTO produtoDTO){
        ProdutoDTO produto = produtoServico.editar(produtoDTO);
        return ResponseEntity.ok(produto);
    }

    @DeleteMapping ("/{id}")
    public void deletar(@PathVariable Long id){
        produtoServico.remover(id);
    }
}