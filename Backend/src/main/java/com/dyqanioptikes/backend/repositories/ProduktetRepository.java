package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Produktet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduktetRepository extends JpaRepository<Produktet, Long> {
    List<Produktet> findByAktivTrue();
}
