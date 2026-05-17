package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Markat;
import com.dyqanioptikes.backend.repositories.MarkatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/markat")
@CrossOrigin(origins = "http://localhost:3000")
public class MarkatController {

    @Autowired
    private MarkatRepository markatRepository;

    @GetMapping
    public List<Markat> getAllMarkat() {
        return markatRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Markat> getMarkaById(@PathVariable Long id) {
        return markatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Markat createMarka(@RequestBody Markat marka) {
        return markatRepository.save(marka);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Markat> updateMarka(@PathVariable Long id, @RequestBody Markat newMarka) {
        return markatRepository.findById(id).map(marka -> {
            marka.setEmriMarkes(newMarka.getEmriMarkes());
            marka.setVendiOrigjines(newMarka.getVendiOrigjines());
            marka.setPershkrimi(newMarka.getPershkrimi());
            marka.setAktive(newMarka.getAktive());
            return ResponseEntity.ok(markatRepository.save(marka));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMarka(@PathVariable Long id) {
        if (markatRepository.existsById(id)) {
            markatRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
