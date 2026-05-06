package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Recetat;
import com.dyqanioptikes.backend.repositories.RecetatRepository; // Shto 't' këtu
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetat")
public class RecetatController {

    @Autowired
    private RecetatRepository recetaRepository; // Sigurohu që tipi është RecetatRepository

    @GetMapping
    public List<Recetat> getAllRecetat() {
        return recetaRepository.findAll();
    }

    @PostMapping
    public Recetat createReceta(@RequestBody Recetat receta) {
        return recetaRepository.save(receta);
    }
}