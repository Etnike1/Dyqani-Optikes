package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.User;
import com.dyqanioptikes.backend.models.UserToken;
import com.dyqanioptikes.backend.repositories.UserTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserTokenService {

    private final UserTokenRepository userTokenRepository;

    public UserTokenService(UserTokenRepository userTokenRepository) {
        this.userTokenRepository = userTokenRepository;
    }

    @Transactional
    public void storeAccessToken(User user, String token, LocalDateTime expiresAt) {
        UserToken userToken = new UserToken();
        userToken.setUser(user);
        userToken.setToken(token);
        userToken.setTokenType("access");
        userToken.setExpiresAt(expiresAt);
        userTokenRepository.save(userToken);
    }

    @Transactional
    public void revokeAllForUser(Long userId) {
        List<UserToken> tokens = userTokenRepository.findByUserId(userId);
        userTokenRepository.deleteAll(tokens);
    }
}
