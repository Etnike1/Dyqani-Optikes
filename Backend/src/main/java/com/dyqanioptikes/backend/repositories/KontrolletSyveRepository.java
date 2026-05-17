package com.dyqanioptikes.backend.repositories;

import com.dyqanioptikes.backend.models.KontrolliSyve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KontrolletSyveRepository extends JpaRepository<KontrolliSyve, Integer> {

}