package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Rezervimet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RezervimetRepository
        extends JpaRepository<Rezervimet, Long> {
    java.util.List<Rezervimet> findByKlienti_Id(Long klientId);
}