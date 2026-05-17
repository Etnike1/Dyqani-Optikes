package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Kategorite;
import com.dyqanioptikes.backend.repositories.KategoriteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kategorite")
@CrossOrigin(origins = "http://localhost:3000")
public class KategoriteController {

    @Autowired
    private KategoriteRepository kategoriteRepository;

    @GetMapping
    public List<Kategorite> getAllKategorite() {
        return kategoriteRepository.findAll();
    }

    @PostMapping
    public Kategorite createKategori(
            @Valid @RequestBody Kategorite kategori) {

        return kategoriteRepository.save(kategori);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kategorite> updateKategori(
            @PathVariable Long id,
            @Valid @RequestBody Kategorite updatedKategori) {

        return kategoriteRepository.findById(id)
                .map(kategori -> {

                    kategori.setEmriKategorise(
                            updatedKategori.getEmriKategorise());

                    kategori.setPershkrimi(
                            updatedKategori.getPershkrimi());

                    kategori.setAktive(
                            updatedKategori.getAktive());

                    return ResponseEntity.ok(
                            kategoriteRepository.save(kategori));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKategori(
            @PathVariable Long id) {

        if (kategoriteRepository.existsById(id)) {

            kategoriteRepository.deleteById(id);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}
