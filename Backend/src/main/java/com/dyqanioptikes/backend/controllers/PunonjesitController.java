package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Punonjesit;
import com.dyqanioptikes.backend.repositories.PunonjesitRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/punonjesit")
@CrossOrigin(origins = "http://localhost:3000")
public class PunonjesitController {

    @Autowired
    private PunonjesitRepository punonjesitRepository;

    @GetMapping
    public List<Punonjesit> getAllPunonjesit() {
        return punonjesitRepository.findAll();
    }

    @GetMapping("/aktiv")
    public List<Punonjesit> getAktivPunonjesit() {
        return punonjesitRepository.findByAktivTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Punonjesit> getPunonjesiById(
            @PathVariable Long id) {

        return punonjesitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Punonjesit createPunonjesit(
            @Valid @RequestBody Punonjesit punonjesit) {

        return punonjesitRepository.save(punonjesit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Punonjesit> updatePunonjes(
            @PathVariable Long id,
            @Valid @RequestBody Punonjesit updatedPunonjes) {

        return punonjesitRepository.findById(id)
                .map(punonjes -> {

                    punonjes.setEmri(updatedPunonjes.getEmri());
                    punonjes.setMbiemri(updatedPunonjes.getMbiemri());
                    punonjes.setRoli(updatedPunonjes.getRoli());
                    punonjes.setEmail(updatedPunonjes.getEmail());
                    punonjes.setTelefoni(updatedPunonjes.getTelefoni());
                    punonjes.setAktiv(updatedPunonjes.getAktiv());

                    return ResponseEntity.ok(
                            punonjesitRepository.save(punonjes));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePunonjesi(
            @PathVariable Long id) {

        if (punonjesitRepository.existsById(id)) {

            punonjesitRepository.deleteById(id);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}