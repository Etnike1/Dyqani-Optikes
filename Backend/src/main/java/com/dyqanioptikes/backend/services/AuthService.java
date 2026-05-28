package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.dto.JwtResponse;
import com.dyqanioptikes.backend.dto.LoginRequest;
import com.dyqanioptikes.backend.dto.RefreshTokenRequest;
import com.dyqanioptikes.backend.dto.RegisterRequest;
import com.dyqanioptikes.backend.models.RefreshToken;
import com.dyqanioptikes.backend.models.Role;
import com.dyqanioptikes.backend.models.User;
import com.dyqanioptikes.backend.models.UserRole;
import com.dyqanioptikes.backend.repositories.RefreshTokenRepository;
import com.dyqanioptikes.backend.repositories.RoleRepository;
import com.dyqanioptikes.backend.repositories.UserRepository;
import com.dyqanioptikes.backend.repositories.UserRoleRepository;
import com.dyqanioptikes.backend.security.JwtUtils;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            UserRoleRepository userRoleRepository,
            PasswordEncoder encoder,
            AuthenticationManager authenticationManager,
            JwtUtils jwtUtils,
            RefreshTokenService refreshTokenService,
            RefreshTokenRepository refreshTokenRepository
    ) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public void registerUser(RegisterRequest signUpRequest) {

        if (userRepository.findByUsername(
                signUpRequest.getUsername()
        ).isPresent()) {

            throw new RuntimeException(
                    "Username already exists!"
            );
        }

        if (userRepository.findByEmail(
                signUpRequest.getEmail()
        ).isPresent()) {

            throw new RuntimeException(
                    "Email already exists!"
            );
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        userRepository.save(user);

        Role role = roleRepository
                .findByName("ROLE_USER")
                .orElseThrow(() ->
                        new RuntimeException("ROLE_USER not found!")
                );

        UserRole userRole = new UserRole(user, role);

        userRoleRepository.save(userRole);
    }

    public JwtResponse loginUser(LoginRequest loginRequest) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()
                        )
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        String jwt =
                jwtUtils.generateJwtToken(authentication);

        User user =
                userRepository.findByUsername(
                        loginRequest.getUsername()
                ).orElseThrow();

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);

        String role =
                authentication.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority();

        return new JwtResponse(
                jwt,
                refreshToken.getToken(),
                user.getUsername(),
                role
        );
    }

    public JwtResponse refreshToken(
            RefreshTokenRequest request
    ) {

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByToken(request.getRefreshToken())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Refresh token invalid!"
                                )
                        );

        if (!refreshTokenService.isValid(refreshToken)) {

            throw new RuntimeException(
                    "Refresh token expired!"
            );
        }

        User user = refreshToken.getUser();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        null,
                        user.getUserRoles()
                                .stream()
                                .map(role ->
                                        new SimpleGrantedAuthority(
                                                role.getRole().getName()
                                        )
                                )
                                .toList()
                );

        String newJwt =
                jwtUtils.generateJwtToken(authentication);

        String role =
                user.getUserRoles()
                        .iterator()
                        .next()
                        .getRole()
                        .getName();

        return new JwtResponse(
                newJwt,
                refreshToken.getToken(),
                user.getUsername(),
                role
        );
    }

    public void logout(
            RefreshTokenRequest request
    ) {

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByToken(request.getRefreshToken())
                        .orElseThrow();

        refreshToken.setRevoked(true);

        refreshTokenRepository.save(refreshToken);
    }
}