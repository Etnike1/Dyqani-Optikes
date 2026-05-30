package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.dto.JwtResponse;
import com.dyqanioptikes.backend.dto.LoginRequest;
import com.dyqanioptikes.backend.dto.RegisterRequest;
import com.dyqanioptikes.backend.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dyqanioptikes.backend.dto.RefreshTokenRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // The controller now only needs a single dependency: your service!
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        authService.registerUser(request);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
        JwtResponse jwtResponse = authService.loginUser(request);
        return ResponseEntity.ok(jwtResponse);
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(
            @RequestBody RefreshTokenRequest request
    ) {

        return ResponseEntity.ok(
                authService.refreshToken(request)
        );
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestBody RefreshTokenRequest request
    ) {

        authService.logout(request);

        return ResponseEntity.ok("Logout successful");
    }
}