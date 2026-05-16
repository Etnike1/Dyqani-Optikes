package com.dyqanioptikes.backend.repository;

import com.dyqanioptikes.backend.model.KontrolliSyve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KontrolletSyveRepository extends JpaRepository<KontrolliSyve, Integer> {

}