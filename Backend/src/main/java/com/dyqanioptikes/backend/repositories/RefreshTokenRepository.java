package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    List<RefreshToken> findByUserId(Long userId);
    Optional<RefreshToken> findByToken(String token);
}
