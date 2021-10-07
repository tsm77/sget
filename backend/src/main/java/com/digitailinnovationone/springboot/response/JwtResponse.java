package com.digitailinnovationone.springboot.response;

import com.sun.org.apache.xpath.internal.operations.Bool;
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
    private Boolean admin;

    public JwtResponse(String accessToken, String nome, String email, Boolean admin) {
        this.token = accessToken;
        this.nome = nome;
        this.email = email;
        this.admin = admin;

    }
}
