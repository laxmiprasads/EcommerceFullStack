package com.auth.authforlogin.Service;


import com.auth.authforlogin.Dto.LoginDto;
import com.auth.authforlogin.Dto.LoginResponse;
import com.auth.authforlogin.Dto.SignUpDto;
import com.auth.authforlogin.Entity.User;
import com.auth.authforlogin.Exception.BadCredentials;
import com.auth.authforlogin.Exception.ResourceAlreadyExist;
import com.auth.authforlogin.Exception.ResourceNotFound;
import com.auth.authforlogin.Repo.UsersRepo;
import com.auth.authforlogin.Util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UsersRepo usersRepo;
    private final JwtUtil jwtUtil;

    public UserService(PasswordEncoder passwordEncoder, UsersRepo usersRepo, JwtUtil jwtUtil) {
        this.passwordEncoder = passwordEncoder;
        this.usersRepo = usersRepo;
        this.jwtUtil = jwtUtil;
    }

    public User signup(@RequestBody SignUpDto request){
        if(usersRepo.findByEmail(request.getEmail()).isPresent()){
            throw new ResourceAlreadyExist("Email already registered");
        }
        if(usersRepo.findByUsername(request.getUsername()).isPresent()){
            throw new ResourceAlreadyExist("Username already exist");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return usersRepo.save(user);
    }

    public LoginResponse login(LoginDto request){
        User searchUser = usersRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFound("User not found"));
        if(!passwordEncoder.matches(request.getPassword(),searchUser.getPassword())){
            throw new BadCredentials("Invalid credentials");
        }
        String token = jwtUtil.generateToken(searchUser.getUsername());
        return new LoginResponse(token, searchUser.getRole(), searchUser.getEmail(), searchUser.getUsername());
    }
}