package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.dto.RegisterRequest;
import com.dyqanioptikes.backend.dto.LoginRequest;
import com.dyqanioptikes.backend.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // Konstruktori
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Logjika...
        return ResponseEntity.ok("User logged in");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) { // <-- Ndryshoje këtu në RegisterRequest
        authService.registerUser(registerRequest); // <-- Sigurohu që edhe këtu ia kalon registerRequest
        return ResponseEntity.ok("User registered successfully");
    }
}