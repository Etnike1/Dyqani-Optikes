package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Inventari;
import com.dyqanioptikes.backend.repositories.InventariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventari")
@CrossOrigin(origins = "http://localhost:3000")
public class InventariController {

    @Autowired
    private InventariRepository inventariRepository;

    @GetMapping
    public List<Inventari> getAllInventari() {
        return inventariRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventari> getInventarById(@PathVariable Long id) {
        return inventariRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Inventari createInventar(@RequestBody Inventari inventari) {
        return inventariRepository.save(inventari);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventari> updateInventar(@PathVariable Long id, @RequestBody Inventari newInventari) {
        return inventariRepository.findById(id).map(inventar -> {
            inventar.setProdukt(newInventari.getProdukt());
            inventar.setSasiaAktuale(newInventari.getSasiaAktuale());
            inventar.setSasiaMinimale(newInventari.getSasiaMinimale());
            return ResponseEntity.ok(inventariRepository.save(inventar));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventar(@PathVariable Long id) {
        if (inventariRepository.existsById(id)) {
            inventariRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
