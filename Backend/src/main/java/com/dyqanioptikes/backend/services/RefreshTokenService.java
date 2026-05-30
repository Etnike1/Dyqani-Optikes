package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.RefreshToken;
import com.dyqanioptikes.backend.models.User;
import com.dyqanioptikes.backend.repositories.RefreshTokenRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository
    ) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public RefreshToken createRefreshToken(User user) {

        RefreshToken refreshToken =
                new RefreshToken();

        refreshToken.setUser(user);

        refreshToken.setToken(
                UUID.randomUUID().toString()
        );

        refreshToken.setExpiryDate(
                LocalDateTime.now().plusDays(7)
        );

        refreshToken.setRevoked(false);

        return refreshTokenRepository.save(refreshToken);
    }

    public boolean isValid(
            RefreshToken token
    ) {

        return !token.getRevoked() &&
                token.getExpiryDate()
                        .isAfter(LocalDateTime.now());
    }
}