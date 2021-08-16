package com.digitailinnovationone.springboot.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private String nome;
    private String email;

    public JwtResponse(String accessToken, String nome, String email) {
        this.token = accessToken;
        this.nome = nome;
        this.email = email;

    }
}
