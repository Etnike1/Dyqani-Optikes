package com.dyqanioptikes.backend.security;

import io.jsonwebtoken.*;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.List;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expirationMs}")
    private int jwtExpirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(Authentication authentication) {

        UserDetails userPrincipal =
                (UserDetails) authentication.getPrincipal();

        List<String> roles = userPrincipal.getAuthorities()
                .stream()
                .map(item -> item.getAuthority())
                .toList();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                new Date().getTime() + jwtExpirationMs
                        )
                )
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String getUsernameFromJwtToken(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {

        try {

            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(authToken);

            return true;

        } catch (SecurityException e) {
            System.out.println("Invalid JWT signature");

        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token");

        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired");

        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported");

        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty");
        }

        return false;
    }
}