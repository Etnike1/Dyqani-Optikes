package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Kategorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KategoriteRepository extends JpaRepository<Kategorite, Long> {
}
