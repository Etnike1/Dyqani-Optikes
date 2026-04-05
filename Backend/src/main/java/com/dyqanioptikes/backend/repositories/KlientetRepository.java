package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Klientet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KlientetRepository extends JpaRepository<Klientet, Long> {
    // Kjo interface do te kryeje automatikisht veprimet me databaze
}