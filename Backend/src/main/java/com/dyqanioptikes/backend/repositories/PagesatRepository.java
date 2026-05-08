package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Pagesat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// KJO LINJË DUHET SHTUAR:
import java.util.List;
import java.util.Optional;

@Repository
public interface PagesatRepository extends JpaRepository<Pagesat, Long> {

    // Kjo metodë tani do të njihet saktë nga Spring
    List<Pagesat> findByPorosiaPorosiId(Long porosiId);
}