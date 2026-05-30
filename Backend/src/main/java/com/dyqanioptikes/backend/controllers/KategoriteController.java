package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Kategorite;
import com.dyqanioptikes.backend.services.KategoriteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kategorite")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class KategoriteController {

    private final KategoriteService service;

    public KategoriteController(KategoriteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Kategorite> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Kategorite getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Kategorite create(@Valid @RequestBody Kategorite kategori) {
        return service.create(kategori);
    }

    @PutMapping("/{id}")
    public Kategorite update(@PathVariable Long id, @Valid @RequestBody Kategorite updatedKategori) {
        return service.update(id, updatedKategori);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}