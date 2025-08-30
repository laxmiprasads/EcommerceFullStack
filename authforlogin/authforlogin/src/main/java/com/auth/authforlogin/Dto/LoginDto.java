package com.auth.authforlogin.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginDto {
    private String username;
    private String password;
}
