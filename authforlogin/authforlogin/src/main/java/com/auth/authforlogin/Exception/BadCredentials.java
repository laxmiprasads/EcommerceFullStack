package com.auth.authforlogin.Exception;

public class BadCredentials extends RuntimeException{
    public BadCredentials(String message){
        super(message);
    }
}
