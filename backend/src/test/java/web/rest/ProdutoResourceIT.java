package web.rest;

import builder.ProdutoBuilder;
import com.digitailinnovationone.springboot.SpringbootApplication;
import com.digitailinnovationone.springboot.recurso.ProdutoRecurso;
import com.digitailinnovationone.springboot.repositorio.ProdutoRepositorio;
import com.digitailinnovationone.springboot.servico.dto.ProdutoDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;
import util.AbstractTestIT;
import util.IntTestComum;
import util.TestUtil;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest(classes = SpringbootApplication.class)
@WebAppConfiguration()
public class ProdutoResourceIT extends AbstractTestIT<ProdutoRecurso> {

    private static final String API_PRODUTOS = "/api/produtos";
    private static final String BUSCAR_PRODUTO = "/api/produtos" + "/{id}";

    @Autowired
    private ProdutoBuilder builder;

    @BeforeEach
    public void setUp() {
        builder.removerTodos();
    }

    @Test
    @Transactional
    public void listarTeste() throws Exception {
        ProdutoDTO produtoDTO = this.builder.construirDTO();
        getMockMvc().perform(get(API_PRODUTOS))
                .andExpect(status().isOk());
    }


    @Test
    @Transactional
    public void buscarIdInvalido() throws Exception {
        getMockMvc().perform(get(API_PRODUTOS + "/123213"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    @DisplayName("Buscar Por Produto")
    public void buscarPorProduto() throws Exception {
        ProdutoDTO produtoDTO = this.builder.construirDTO();
        getMockMvc().perform(get(BUSCAR_PRODUTO, produtoDTO.getId())
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(produtoDTO))).andExpect(status().isOk());
    }
}
