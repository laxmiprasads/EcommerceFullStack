package com.auth.authforlogin.Util;


import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String secretKey = "niatgfdkqwertyuiopasdfghjkghjklzxcvbnmadsdfskjdsfs987";
    private final long exptime = 24000 * 60 * 60;

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + exptime))
                .signWith(SignatureAlgorithm.HS256,secretKey)
                .compact();
    }

    public String extractusername(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public Boolean validatetoken(String token){
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (JwtException e){
            return false;
        }
    }
}
