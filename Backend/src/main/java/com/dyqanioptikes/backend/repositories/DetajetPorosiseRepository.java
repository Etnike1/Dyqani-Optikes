package com.dyqanioptikes.backend.repository;

import com.dyqanioptikes.backend.models.DetajetPorosise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetajetPorosiseRepository extends JpaRepository<DetajetPorosise, Integer> {
    // Kërkon të gjitha detajet që i përkasin një ID-je të caktuar porosi_id
    List<DetajetPorosise> findByPorosia_PorosiId(Integer porosiId);
}