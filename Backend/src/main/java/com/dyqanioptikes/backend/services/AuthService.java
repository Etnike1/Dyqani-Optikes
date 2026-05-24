package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.User;
import com.dyqanioptikes.backend.models.Role;
import com.dyqanioptikes.backend.models.UserRole;
import com.dyqanioptikes.backend.dto.RegisterRequest;
import com.dyqanioptikes.backend.dto.LoginRequest;
import com.dyqanioptikes.backend.dto.JwtResponse;
import com.dyqanioptikes.backend.security.JwtUtils;
import com.dyqanioptikes.backend.repositories.UserRepository;
import com.dyqanioptikes.backend.repositories.RoleRepository;
import com.dyqanioptikes.backend.repositories.UserRoleRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    // Unified constructor for dependency injection
    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       UserRoleRepository userRoleRepository,
                       PasswordEncoder encoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public void registerUser(RegisterRequest signUpRequest) {
        // Validation check to see if username is already taken
        if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Gabim: Emri i përdoruesit ekziston!");
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );
        userRepository.save(user);

        // Fetching the role from the database and setting up user relations
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Roli 'ROLE_USER' nuk u gjet në databazë!"));

        UserRole userRole = new UserRole(user, role);
        userRoleRepository.save(userRole);
    }

    public JwtResponse loginUser(LoginRequest loginRequest) {
        // Authenticate credentials against UserDetailsService
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate our JWT token string
        String jwt = jwtUtils.generateJwtToken(authentication);

        // Extracting user role dynamically to send back in JSON format
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        return new JwtResponse(jwt, loginRequest.getUsername(), role);
    }
}