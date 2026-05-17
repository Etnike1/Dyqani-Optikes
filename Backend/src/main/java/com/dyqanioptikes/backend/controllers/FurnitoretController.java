package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Furnitoret;
import com.dyqanioptikes.backend.repositories.FurnitoretRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/furnitoret")
@CrossOrigin(origins = "http://localhost:3000")
public class FurnitoretController {

    @Autowired
    private FurnitoretRepository furnitoretRepository;

    @GetMapping
    public List<Furnitoret> getAllFurnitoret() {
        return furnitoretRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Furnitoret> getFurnitorById(@PathVariable Long id) {

        return furnitoretRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Furnitoret createFurnitor(
            @Valid @RequestBody Furnitoret furnitor) {

        return furnitoretRepository.save(furnitor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Furnitoret> updateFurnitor(
            @PathVariable Long id,
            @Valid @RequestBody Furnitoret updatedFurnitor) {

        return furnitoretRepository.findById(id)
                .map(furnitor -> {

                    furnitor.setEmriKompanise(updatedFurnitor.getEmriKompanise());
                    furnitor.setPersoniKontaktit(updatedFurnitor.getPersoniKontaktit());
                    furnitor.setEmail(updatedFurnitor.getEmail());
                    furnitor.setTelefoni(updatedFurnitor.getTelefoni());
                    furnitor.setProduktetFurnizuara(updatedFurnitor.getProduktetFurnizuara());

                    return ResponseEntity.ok(furnitoretRepository.save(furnitor));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFurnitor(@PathVariable Long id) {

        if (furnitoretRepository.existsById(id)) {
            furnitoretRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}