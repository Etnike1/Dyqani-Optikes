package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Njoftimet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NjoftimetRepository
        extends JpaRepository<Njoftimet, Long> {
}