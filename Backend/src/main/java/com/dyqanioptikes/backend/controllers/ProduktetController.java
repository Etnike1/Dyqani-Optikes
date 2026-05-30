package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Produktet;
import com.dyqanioptikes.backend.services.ProduktetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produktet")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ProduktetController {

    private final ProduktetService service;

    public ProduktetController(ProduktetService service) {
        this.service = service;
    }

    @GetMapping
    public List<Produktet> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Produktet getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produktet create(@Valid @RequestBody Produktet produkt) {
        return service.create(produkt);
    }

    @PutMapping("/{id}")
    public Produktet update(@PathVariable Long id, @Valid @RequestBody Produktet updatedProdukt) {
        return service.update(id, updatedProdukt);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}