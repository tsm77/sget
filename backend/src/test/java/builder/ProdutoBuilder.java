package builder;

import com.digitailinnovationone.springboot.dominio.Produto;
import com.digitailinnovationone.springboot.repositorio.ProdutoRepositorio;
import com.digitailinnovationone.springboot.servico.ProdutoServico;
import com.digitailinnovationone.springboot.servico.dto.ProdutoDTO;
import com.digitailinnovationone.springboot.servico.mapper.ProdutoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import util.ConstantsTestUtil;

import java.text.ParseException;
import java.util.Collection;

@Component
public class ProdutoBuilder extends ConstrutorDeEntidade<Produto> {

    @Autowired
    private ProdutoMapper mapper;

    @Autowired
    private ProdutoServico servico;

    @Autowired
    private ProdutoRepositorio repositorio;

    @Override
    protected Produto construirEntidade() throws ParseException {
        Produto produto = new Produto();
        produto.setNome(ConstantsTestUtil.NOME_PRODUTO);
        produto.setDescricao(ConstantsTestUtil.DESCRICAO_PRODUTO);
        produto.setPreco(ConstantsTestUtil.PRECO);
        produto.setQuantidade(ConstantsTestUtil.QUANTIDADE_PRODUTO);
        return produto;
    }

    public ProdutoDTO construirObjetoDTO() throws ParseException {
        return this.mapper.toDto(this.construirEntidade());
    }

    public ProdutoDTO construirDTO() throws ParseException {
        return this.mapper.toDto(this.construir());
    }

    @Override
    protected Produto persistir(Produto entidade) {
        ProdutoDTO dto = this.servico.salvar(this.mapper.toDto(entidade));
        return this.mapper.toEntity(dto);
    }

    @Override
    protected Collection<Produto> obterTodos() {
        return null;
    }

    @Override
    protected Produto obterPorId(Integer id) {
        return null;
    }

    public void removerTodos() {
        this.repositorio.deleteAll();
    }
}
