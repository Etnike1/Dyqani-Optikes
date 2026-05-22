package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.HistorikuVizitave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistorikuVizitaveRepository
        extends JpaRepository<HistorikuVizitave, Long> {
}