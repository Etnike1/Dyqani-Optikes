package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Lentet;
import com.dyqanioptikes.backend.repositories.LentetRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lentet")
@CrossOrigin(origins = "http://localhost:3000")
public class LentetController {

    @Autowired
    private LentetRepository lentetRepository;

    @GetMapping
    public List<Lentet> getAllLentet() {
        return lentetRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lentet> getLenteById(@PathVariable Long id) {

        return lentetRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Lentet createLente(@Valid @RequestBody Lentet lente) {
        return lentetRepository.save(lente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lentet> updateLente(
            @PathVariable Long id,
            @Valid @RequestBody Lentet updatedLente) {

        return lentetRepository.findById(id)
                .map(lente -> {

                    lente.setLlojiLentes(updatedLente.getLlojiLentes());
                    lente.setProdhuesi(updatedLente.getProdhuesi());
                    lente.setIndeksi(updatedLente.getIndeksi());
                    lente.setVeshja(updatedLente.getVeshja());
                    lente.setCmimi(updatedLente.getCmimi());
                    lente.setSasiaStok(updatedLente.getSasiaStok());

                    return ResponseEntity.ok(lentetRepository.save(lente));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLente(@PathVariable Long id) {

        if (lentetRepository.existsById(id)) {
            lentetRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}