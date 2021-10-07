package util;

import com.digitailinnovationone.springboot.SpringbootApplication;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.ResourceHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@WithMockUser
@SpringBootTest(classes = SpringbootApplication.class)
public class AbstractTestIT{

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableHandlerMethodArgumentResolver;


    @Autowired
    private MappingJackson2HttpMessageConverter converter;

    private MockMvc mockMvc;




    public PageableHandlerMethodArgumentResolver getPageableHandlerMethodArgumentResolver() {
        return pageableHandlerMethodArgumentResolver;
    }

    public MappingJackson2HttpMessageConverter getConverter() {
        return converter;
    }

    public MockMvc getMockMvc() {
        return mockMvc;
    }
}
