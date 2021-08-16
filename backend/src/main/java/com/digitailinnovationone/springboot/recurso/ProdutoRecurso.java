package com.digitailinnovationone.springboot.recurso;

import com.digitailinnovationone.springboot.servico.ProdutoServico;
import com.digitailinnovationone.springboot.servico.dto.ProdutoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
public class ProdutoRecurso {
    @Autowired
    private final ProdutoServico produtoServico;

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> listar() {
        List list = produtoServico.listar();
        return ResponseEntity.ok(list);
    }
    @GetMapping ("/{id}")
    public ResponseEntity<ProdutoDTO> buscar(@PathVariable Integer id){
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
    @PreAuthorize("hasRole('ADMIN')")
    public void deletar(@PathVariable Integer id){
        produtoServico.remover(id);
    }
}