package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Recetat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecetatRepository extends JpaRepository<Recetat, Long> {
    // I kemi lënë metodat bosh që të niset aplikacioni pa gabime
}