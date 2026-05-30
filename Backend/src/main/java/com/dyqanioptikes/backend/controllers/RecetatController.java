package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Recetat;
import com.dyqanioptikes.backend.services.RecetatService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetat")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class RecetatController {

    private final RecetatService service;

    public RecetatController(RecetatService service) {
        this.service = service;
    }

    @GetMapping
    public List<Recetat> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Recetat getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Recetat create(@Valid @RequestBody Recetat receta) {
        return service.create(receta);
    }

    @PutMapping("/{id}")
    public Recetat update(@PathVariable Long id, @Valid @RequestBody Recetat updatedReceta) {
        return service.update(id, updatedReceta);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}