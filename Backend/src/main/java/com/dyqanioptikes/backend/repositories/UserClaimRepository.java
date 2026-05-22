package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.UserClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserClaimRepository extends JpaRepository<UserClaim, Long> {
    List<UserClaim> findByUserId(Long userId);
}