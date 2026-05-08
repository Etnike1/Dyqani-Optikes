package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Furnitoret;
import com.dyqanioptikes.backend.repositories.FurnitoretRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/furnitoret")
@CrossOrigin(origins = "*")
public class FurnitoretController {

    @Autowired
    private FurnitoretRepository furnitoretRepository;

    @GetMapping
    public List<Furnitoret> getAllFurnitoret() {
        return furnitoretRepository.findAll();
    }

    @PostMapping
    public Furnitoret createFurnitor(@RequestBody Furnitoret furnitor) {
        return furnitoretRepository.save(furnitor);
    }

    @GetMapping("/{id}")
    public Furnitoret getFurnitorById(@PathVariable Long id) {
        return furnitoretRepository.findById(id).orElse(null);
    }
}
