package com.auth.authforlogin.Controller;


import com.auth.authforlogin.Dto.LoginDto;
import com.auth.authforlogin.Dto.LoginResponse;
import com.auth.authforlogin.Dto.SignUpResponse;
import com.auth.authforlogin.Dto.SignUpDto;
import com.auth.authforlogin.Entity.User;
import com.auth.authforlogin.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SignUpController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signupUser(@RequestBody SignUpDto request){
        User savedUser = userService.signup(request);
        return new ResponseEntity<>(new SignUpResponse(savedUser.getUsername(), "Successfully Signed up"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginDto request){
        LoginResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }


    
}
