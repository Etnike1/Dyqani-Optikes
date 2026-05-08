package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Punonjesit;
import com.dyqanioptikes.backend.repositories.PunonjesitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/punonjesit")
@CrossOrigin(origins = "*") // Lejon React-in të qaset në këtë API
public class PunonjesitController {

    @Autowired
    private PunonjesitRepository punonjesitRepository;

    // 1. Merr të gjithë punonjësit
    @GetMapping
    public List<Punonjesit> getAllPunonjesit() {
        return punonjesitRepository.findAll();
    }

    // 2. Merr punonjësit aktivë
    @GetMapping("/aktiv")
    public List<Punonjesit> getAktivPunonjesit() {
        return punonjesitRepository.findByAktivTrue();
    }

    // 3. Shto një punonjës të ri
    @PostMapping
    public Punonjesit createPunonjesit(@RequestBody Punonjesit punonjesit) {
        return punonjesitRepository.save(punonjesit);
    }

    // 4. Merr një punonjës specifik me ID
    @GetMapping("/{id}")
    public ResponseEntity<Punonjesit> getPunonjesiById(@PathVariable Long id) {
        return punonjesitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Fshij (ose bëj jo-aktiv) një punonjës
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePunonjesi(@PathVariable Long id) {
        if (punonjesitRepository.existsById(id)) {
            punonjesitRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}