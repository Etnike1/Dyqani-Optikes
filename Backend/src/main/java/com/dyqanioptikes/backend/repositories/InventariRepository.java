package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Inventari;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventariRepository extends JpaRepository<Inventari, Long> {
}
