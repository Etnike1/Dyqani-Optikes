package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.dto.JwtResponse;
import com.dyqanioptikes.backend.dto.LoginRequest;
import com.dyqanioptikes.backend.dto.RefreshTokenRequest;
import com.dyqanioptikes.backend.dto.RegisterRequest;
import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.models.RefreshToken;
import com.dyqanioptikes.backend.models.Role;
import com.dyqanioptikes.backend.models.User;
import com.dyqanioptikes.backend.models.UserClaim;
import com.dyqanioptikes.backend.models.UserRole;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import com.dyqanioptikes.backend.repositories.RefreshTokenRepository;
import com.dyqanioptikes.backend.repositories.RoleRepository;
import com.dyqanioptikes.backend.repositories.UserClaimRepository;
import com.dyqanioptikes.backend.repositories.UserRepository;
import com.dyqanioptikes.backend.repositories.UserRoleRepository;
import com.dyqanioptikes.backend.security.CustomUserDetails;
import com.dyqanioptikes.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserClaimRepository userClaimRepository;
    private final KlientetRepository klientetRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserTokenService userTokenService;

    @Value("${app.jwt.expirationMs}")
    private int jwtExpirationMs;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            UserRoleRepository userRoleRepository,
            UserClaimRepository userClaimRepository,
            KlientetRepository klientetRepository,
            PasswordEncoder encoder,
            AuthenticationManager authenticationManager,
            JwtUtils jwtUtils,
            RefreshTokenService refreshTokenService,
            RefreshTokenRepository refreshTokenRepository,
            UserTokenService userTokenService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.userClaimRepository = userClaimRepository;
        this.klientetRepository = klientetRepository;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userTokenService = userTokenService;
    }

    @Transactional
    public void registerUser(RegisterRequest signUpRequest) {
        if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }

        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );
        userRepository.save(user);

        Role role = roleRepository.findByName("ROLE_CLIENT")
                .orElseThrow(() -> new RuntimeException("ROLE_CLIENT not found!"));

        userRoleRepository.save(new UserRole(user, role));

        Klientet klient = new Klientet();
        klient.setEmri(signUpRequest.getUsername());
        klient.setMbiemri("");
        klient.setEmail(signUpRequest.getEmail());
        klient.setUserId(user.getId());
        klientetRepository.save(klient);

        userClaimRepository.save(new UserClaim(user, "klient_id", String.valueOf(klient.getId())));
    }

    @Transactional
    public JwtResponse loginUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        String role = authentication.getAuthorities().iterator().next().getAuthority();

        userTokenService.storeAccessToken(user, jwt, LocalDateTime.now().plusSeconds(jwtExpirationMs / 1000L));

        return new JwtResponse(jwt, refreshToken.getToken(), user.getId(), user.getUsername(), role);
    }

    @Transactional
    public JwtResponse refreshToken(RefreshTokenRequest request) {
        if (request.getRefreshToken() == null || request.getRefreshToken().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token is required");
        }

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(request.getRefreshToken())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Refresh token invalid"));

        if (!refreshTokenService.isValid(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Refresh token expired or revoked");
        }

        User user = refreshToken.getUser();

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                new CustomUserDetails(
                        user.getId(),
                        user.getUsername(),
                        user.getPassword(),
                        user.getUserRoles().stream()
                                .map(r -> new SimpleGrantedAuthority(r.getRole().getName()))
                                .toList()
                ),
                null,
                user.getUserRoles().stream()
                        .map(r -> new SimpleGrantedAuthority(r.getRole().getName()))
                        .toList()
        );

        String newJwt = jwtUtils.generateJwtToken(authentication);

        String role = user.getUserRoles().iterator().next().getRole().getName();

        userTokenService.storeAccessToken(user, newJwt, LocalDateTime.now().plusSeconds(jwtExpirationMs / 1000L));

        return new JwtResponse(newJwt, refreshToken.getToken(), user.getId(), user.getUsername(), role);
    }

    @Transactional
    public void logout(RefreshTokenRequest request) {
        if (request.getRefreshToken() == null || request.getRefreshToken().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token is required");
        }

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(request.getRefreshToken())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token not found"));

        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);

        Long userId = refreshToken.getUser().getId();
        refreshTokenRepository.findByUserId(userId).forEach(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });

        userTokenService.revokeAllForUser(userId);
    }
}
