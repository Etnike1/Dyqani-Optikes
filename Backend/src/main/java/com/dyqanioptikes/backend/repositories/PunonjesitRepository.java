package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Punonjesit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PunonjesitRepository extends JpaRepository<Punonjesit, Long> {

    List<Punonjesit> findByAktivTrue();

    Optional<Punonjesit> findByEmail(String email);
}