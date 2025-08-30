package com.auth.authforlogin.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SignUpDto {
    private String username;
    private String password;
    private String email;
    private String role;
}
