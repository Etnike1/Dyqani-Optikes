package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.Pagesat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PagesatRepository extends JpaRepository<Pagesat, Long> {


    List<Pagesat> findByPorosia_PorosiId(Long porosiId);
}