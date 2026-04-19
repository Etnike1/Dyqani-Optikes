package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/klientet")
@CrossOrigin(origins = "http://localhost:3000") // Lejon React-in të marrë të dhënat
public class KlientetController {

    @Autowired
    private KlientetRepository klientetRepository;

    // Merr të gjithë klientët nga databaza
    @GetMapping
    public List<Klientet> getAllKlientet() {
        return klientetRepository.findAll();
    }
    @GetMapping("/")
    public String home() {
        return "Serveri i Dyqanit të Optikës është LIVE!";
    }
    @PostMapping("/shto")
    public Klientet shtoKlientet(@RequestBody Klientet klient) {
        return klientetRepository.save(klient);
    }

    // Shto një klient të ri
    @PostMapping
    public Klientet createKlient(@RequestBody Klientet klient) {
        return klientetRepository.save(klient);
    }
}