package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Dergesat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DergesatRepository extends JpaRepository<Dergesat, Integer> {

    // Gjen dërgesat sipas porosiId (Long) që vjen nga modeli Porosite
    List<Dergesat> findByPorosia_PorosiId(Long porosiId);
}