package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Furnitoret;
import com.dyqanioptikes.backend.services.FurnitoretService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/furnitoret")
@CrossOrigin(origins = "http://localhost:3000")
public class FurnitoretController {

    private final FurnitoretService service;

    public FurnitoretController(FurnitoretService service) {
        this.service = service;
    }

    @GetMapping
    public List<Furnitoret> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Furnitoret getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Furnitoret create(@Valid @RequestBody Furnitoret furnitori) {
        return service.create(furnitori);
    }

    @PutMapping("/{id}")
    public Furnitoret update(@PathVariable Long id, @Valid @RequestBody Furnitoret updatedFurnitori) {
        return service.update(id, updatedFurnitori);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}