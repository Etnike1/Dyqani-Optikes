package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Porosite;
import com.dyqanioptikes.backend.repositories.PorositeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/porosite")
@CrossOrigin(origins = "*")
public class PorositeController {

    @Autowired
    private PorositeRepository porositeRepository;

    @GetMapping
    public List<Porosite> getAllPorosite() {
        return porositeRepository.findAll();
    }

    @PostMapping
    public Porosite createPorosia(@RequestBody Porosite porosia) {
        return porositeRepository.save(porosia);
    }

    @GetMapping("/{id}")
    public Porosite getPorosiaById(@PathVariable Long id) {
        return porositeRepository.findById(id).orElse(null);
    }
}