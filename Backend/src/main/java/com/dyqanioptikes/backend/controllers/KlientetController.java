package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.services.KlientetService; // Importojmë Service-in e ri
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/klientet")
@CrossOrigin(origins = "http://localhost:3000")
public class KlientetController {

    @Autowired
    private KlientetService klientetService; // Tani përdorim vetëm Service-in!

    // 1. Merr të gjithë klientët
    @GetMapping
    public List<Klientet> getAllKlientet() {
        return klientetService.getAllKlientet();
    }

    // 2. Kontrolli i statusit të serverit
    @GetMapping("/")
    public String home() {
        return "Serveri i Dyqanit të Optikës është LIVE!";
    }

    // 3. Shto një klient të ri
    @PostMapping
    public Klientet createKlient(@Valid @RequestBody Klientet klient) {
        return klientetService.createKlient(klient);
    }

    // 4. Përditëso të dhënat e një klienti ekzistues
    @PutMapping("/{id}")
    public Klientet updateKlient(
            @PathVariable Long id,
            @Valid @RequestBody Klientet updatedKlient) {
        // Thirret metoda e thjeshtuar nga Service
        return klientetService.updateKlient(id, updatedKlient);
    }

    // 5. Fshij një klient
    @DeleteMapping("/{id}")
    public void deleteKlient(@PathVariable Long id) {
        klientetService.deleteKlient(id);
    }
}