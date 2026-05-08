package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Lentet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LentetRepository extends JpaRepository<Lentet, Long> {
}