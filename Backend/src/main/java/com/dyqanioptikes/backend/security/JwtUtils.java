package com.dyqanioptikes.backend.security;

import org.springframework.security.core.Authentication; // Importi për Authentication
import org.springframework.stereotype.Component;


@Component
public class JwtUtils {
    private final String jwtSecret = "sekretiytshumeeformatqenukduhettedijekush"; // Ndryshoje!

    public String generateJwtToken(Authentication authentication) {
        // Logjika për gjenerimin e tokenit (përdor Jwts.builder())
        // ...
        return "JWT_TOKEN_HERE";
    }
}