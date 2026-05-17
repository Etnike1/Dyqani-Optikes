package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Markat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkatRepository extends JpaRepository<Markat, Long> {
}
