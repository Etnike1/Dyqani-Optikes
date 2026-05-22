package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Garancite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GaranciteRepository extends JpaRepository<Garancite, Long> {

    List<Garancite> findByPorosia_PorosiId(Long porosiId);

    List<Garancite> findByKlienti_Id(Long klientId);
}