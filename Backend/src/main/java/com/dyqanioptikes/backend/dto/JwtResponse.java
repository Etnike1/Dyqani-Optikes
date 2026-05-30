package com.dyqanioptikes.backend.dto;

public class JwtResponse {

    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private String username;
    private String role;

    public JwtResponse(
            String token,
            String refreshToken,
            String username,
            String role
    ) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.username = username;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getType() {
        return type;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}