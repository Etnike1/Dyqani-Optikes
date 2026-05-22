package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Porosite;
import com.dyqanioptikes.backend.services.PorositeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/porosite")
@CrossOrigin(origins = "http://localhost:3000")
public class PorositeController {

    private final PorositeService service;

    public PorositeController(PorositeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Porosite> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Porosite getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Porosite create(@Valid @RequestBody Porosite porosia) {
        return service.create(porosia);
    }

    @PutMapping("/{id}")
    public Porosite update(@PathVariable Long id, @Valid @RequestBody Porosite updatedPorosia) {
        return service.update(id, updatedPorosia);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}