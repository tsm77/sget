package com.digitailinnovationone.springboot.servico;

import com.digitailinnovationone.springboot.dominio.Produto;
import com.digitailinnovationone.springboot.repositorio.ProdutoRepositorio;
import com.digitailinnovationone.springboot.servico.Exception.RegraNegocioException;
import com.digitailinnovationone.springboot.servico.dto.ProdutoDTO;
import com.digitailinnovationone.springboot.servico.mapper.ProdutoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProdutoServico {

    private final ProdutoRepositorio produtoRepositorio;
    private final ProdutoMapper produtoMapper;


    public List<ProdutoDTO> listar() {
        List<Produto> usuarios = produtoRepositorio.findAll();
        return produtoMapper.toDto(usuarios);
    }
    public ProdutoDTO obterPorId(Integer id){
        Produto produto = produtoRepositorio.findById(id).orElseThrow(()
                -> new RegraNegocioException("ID nao encontrado"));
        return produtoMapper.toDto(produto);
    }

    public ProdutoDTO salvar(ProdutoDTO produtoDTO) {
        verificarPost(produtoDTO);
        Produto produto = produtoMapper.toEntity(produtoDTO);
        produtoRepositorio.save(produto);
        return produtoMapper.toDto(produto);
    }
    public ProdutoDTO editar (ProdutoDTO produtoDTO) {
        verificarPut(produtoDTO);

        Produto produto = produtoMapper.toEntity(produtoDTO);
        produtoRepositorio.save(produto);
        return produtoMapper.toDto(produto);

    }

    public void remover(Integer id){
      produtoRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException("Produto nao encontrado"));
        produtoRepositorio.deleteById(id);
    }

    public void verificarPost(ProdutoDTO produtoDTO){
        if(produtoRepositorio.findByNome(produtoDTO.getNome()) != null)
            throw new RegraNegocioException("Produto já cadstrado");
    }



    public void validarNome(ProdutoDTO produtoDTO){
        Produto produto = produtoRepositorio.findByNome(produtoDTO.getNome());
        if(produto != null && !produto.getId().equals(produtoDTO.getId())){
            throw new RegraNegocioException("Produto ja cadastrado");
        }
    }
    public void verificarPut(ProdutoDTO produtoDTO) {
        if (produtoDTO.getId() != null) {
            obterPorId(produtoDTO.getId());
            validarNome(produtoDTO);

        } else
            throw new RegraNegocioException("Produto não econtrado!");

    }

}
