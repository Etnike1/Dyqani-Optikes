package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Produktet;
import com.dyqanioptikes.backend.repositories.ProduktetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produktet")
@CrossOrigin(origins = "*")
public class ProduktetController {

    @Autowired
    private ProduktetRepository produktetRepository;

    @GetMapping
    public List<Produktet> getAllProduktet() {
        return produktetRepository.findAll();
    }

    @PostMapping
    public Produktet createProdukt(@RequestBody Produktet produkt) {
        return produktetRepository.save(produkt);
    }

    @GetMapping("/{id}")
    public Produktet getProduktById(@PathVariable Long id) {
        return produktetRepository.findById(id).orElse(null);
    }
}
