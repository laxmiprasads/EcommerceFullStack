package com.auth.authforlogin.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SignUpResponse {
    private String username;
    private String message;
}
