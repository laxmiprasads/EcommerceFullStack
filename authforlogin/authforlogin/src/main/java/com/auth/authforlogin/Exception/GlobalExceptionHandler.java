package com.auth.authforlogin.Exception;

import com.auth.authforlogin.Dto.ErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    public ResponseEntity<ErrorResponseDto>  buildError(Exception ex, HttpStatus status, String path){
        ErrorResponseDto error= new ErrorResponseDto(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                ex.getMessage(),
                path
        );

        return new ResponseEntity<>(error,status);

    }

    @ExceptionHandler(ResourceAlreadyExist.class)
    public ResponseEntity<ErrorResponseDto>  handleResourceExistsEx(Exception ex, HttpServletRequest request){
        return buildError(ex,HttpStatus.BAD_REQUEST,request.getRequestURI());
    }

    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<ErrorResponseDto> handleResourceNotFound(Exception ex, HttpServletRequest request){
        return buildError(ex,HttpStatus.NOT_FOUND, request.getRequestURI());
    }

    @ExceptionHandler(BadCredentials.class)
    public ResponseEntity<ErrorResponseDto> handleBadCredentials(Exception ex, HttpServletRequest request){
        return buildError(ex,HttpStatus.UNAUTHORIZED, request.getRequestURI());
    }
}
