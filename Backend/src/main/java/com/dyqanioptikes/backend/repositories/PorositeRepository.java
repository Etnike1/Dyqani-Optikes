package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Porosite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PorositeRepository extends JpaRepository<Porosite, Long> {
}