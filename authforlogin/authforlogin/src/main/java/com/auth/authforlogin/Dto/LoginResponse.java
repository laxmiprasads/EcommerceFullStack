package com.auth.authforlogin.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginResponse {
    private String jwtToken;
    private String role;
    private String email;
    private String username;
}