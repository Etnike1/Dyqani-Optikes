package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Produktet;
import com.dyqanioptikes.backend.repositories.ProduktetRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produktet")
@CrossOrigin(origins = "http://localhost:3000")
public class ProduktetController {

    @Autowired
    private ProduktetRepository produktetRepository;

    @GetMapping
    public List<Produktet> getAllProduktet() {
        return produktetRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produktet> getProduktById(
            @PathVariable Long id) {

        return produktetRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produktet createProdukt(
            @Valid @RequestBody Produktet produkt) {

        return produktetRepository.save(produkt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produktet> updateProdukt(
            @PathVariable Long id,
            @Valid @RequestBody Produktet updatedProdukt) {

        return produktetRepository.findById(id)
                .map(produkt -> {

                    produkt.setEmriProduktit(
                            updatedProdukt.getEmriProduktit());

                    produkt.setMarka(updatedProdukt.getMarka());

                    produkt.setModeli(updatedProdukt.getModeli());

                    produkt.setCmimi(updatedProdukt.getCmimi());

                    produkt.setSasiaStok(
                            updatedProdukt.getSasiaStok());

                    produkt.setNgjyra(updatedProdukt.getNgjyra());

                    produkt.setMateriali(
                            updatedProdukt.getMateriali());

                    produkt.setAktiv(updatedProdukt.getAktiv());

                    produkt.setKategori(
                            updatedProdukt.getKategori());

                    return ResponseEntity.ok(
                            produktetRepository.save(produkt));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProdukt(
            @PathVariable Long id) {

        if (produktetRepository.existsById(id)) {

            produktetRepository.deleteById(id);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}