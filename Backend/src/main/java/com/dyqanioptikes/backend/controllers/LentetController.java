package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Lentet;
import com.dyqanioptikes.backend.repositories.LentetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lentet")
@CrossOrigin(origins = "*")
public class LentetController {

    @Autowired
    private LentetRepository lentetRepository;

    @GetMapping
    public List<Lentet> getAllLentet() {
        return lentetRepository.findAll();
    }

    @PostMapping
    public Lentet createLente(@RequestBody Lentet lente) {
        return lentetRepository.save(lente);
    }

    @GetMapping("/{id}")
    public Lentet getLenteById(@PathVariable Long id) {
        return lentetRepository.findById(id).orElse(null);
    }
}