package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Porosite;
import com.dyqanioptikes.backend.repositories.PorositeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/porosite")
@CrossOrigin(origins = "http://localhost:3000")
public class PorositeController {

    @Autowired
    private PorositeRepository porositeRepository;

    @GetMapping
    public List<Porosite> getAllPorosite() {
        return porositeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Porosite> getPorosiaById(
            @PathVariable Long id) {

        return porositeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Porosite createPorosia(
            @Valid @RequestBody Porosite porosia) {

        return porositeRepository.save(porosia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Porosite> updatePorosia(
            @PathVariable Long id,
            @Valid @RequestBody Porosite updatedPorosia) {

        return porositeRepository.findById(id)
                .map(porosia -> {

                    porosia.setKlient(updatedPorosia.getKlient());
                    porosia.setReceta(updatedPorosia.getReceta());
                    porosia.setPunonjesi(updatedPorosia.getPunonjesi());
                    porosia.setTotali(updatedPorosia.getTotali());
                    porosia.setStatusi(updatedPorosia.getStatusi());
                    porosia.setDataGatshmerise(
                            updatedPorosia.getDataGatshmerise());

                    return ResponseEntity.ok(
                            porositeRepository.save(porosia));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePorosia(
            @PathVariable Long id) {

        if (porositeRepository.existsById(id)) {

            porositeRepository.deleteById(id);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}