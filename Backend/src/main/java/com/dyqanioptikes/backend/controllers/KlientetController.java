package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import jakarta.validation.Valid; // Shtuar për të mundësuar @Valid pa gabime kompiliimi
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/klientet")
@CrossOrigin(origins = "http://localhost:3000") // Lejon React-in të marrë të dhënat
public class KlientetController {

    @Autowired
    private KlientetRepository klientetRepository;

    // 1. Merr të gjithë klientët nga databaza
    @GetMapping
    public List<Klientet> getAllKlientet() {
        return klientetRepository.findAll();
    }

    // 2. Kontrolli i statusit të serverit
    @GetMapping("/")
    public String home() {
        return "Serveri i Dyqanit të Optikës është LIVE!";
    }

    // 3. Shto një klient të ri (Standard POST)
    @PostMapping
    public Klientet createKlient(@Valid @RequestBody Klientet klient) {
        return klientetRepository.save(klient);
    }

    // 4. Përditëso të dhënat e një klienti ekzistues
    @PutMapping("/{id}")
    public Klientet updateKlient(
            @PathVariable Long id,
            @Valid @RequestBody Klientet updatedKlient) {

        return klientetRepository.findById(id)
                .map(klient -> {
                    klient.setEmri(updatedKlient.getEmri());
                    klient.setMbiemri(updatedKlient.getMbiemri());
                    klient.setEmail(updatedKlient.getEmail());
                    klient.setTelefoni(updatedKlient.getTelefoni());
                    klient.setDataLindjes(updatedKlient.getDataLindjes());
                    klient.setAdresa(updatedKlient.getAdresa());
                    return klientetRepository.save(klient);
                })
                .orElseThrow(() -> new RuntimeException("Klienti nuk u gjet me ID: " + id));
    }

    // 5. Fshij një klient
    @DeleteMapping("/{id}")
    public void deleteKlient(@PathVariable Long id) {
        klientetRepository.deleteById(id);
    }
}
