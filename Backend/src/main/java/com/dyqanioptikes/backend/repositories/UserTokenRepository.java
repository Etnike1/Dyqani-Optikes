package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserTokenRepository extends JpaRepository<UserToken, Long> {
    List<UserToken> findByUserId(Long userId);
}