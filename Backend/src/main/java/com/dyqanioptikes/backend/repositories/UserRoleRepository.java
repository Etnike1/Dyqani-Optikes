package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    // Ndihmon për të gjetur të gjitha rolet e një përdoruesi të caktuar
    List<UserRole> findByUserId(Long userId);
}