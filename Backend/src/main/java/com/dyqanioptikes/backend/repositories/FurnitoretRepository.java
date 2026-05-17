package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Furnitoret;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FurnitoretRepository extends JpaRepository<Furnitoret, Long> {
}
