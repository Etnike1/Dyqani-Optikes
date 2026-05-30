package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Lentet;
import com.dyqanioptikes.backend.services.LentetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lentet")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class LentetController {

    private final LentetService service;

    public LentetController(LentetService service) {
        this.service = service;
    }

    @GetMapping
    public List<Lentet> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Lentet getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Lentet create(@Valid @RequestBody Lentet lente) {
        return service.create(lente);
    }

    @PutMapping("/{id}")
    public Lentet update(@PathVariable Long id, @Valid @RequestBody Lentet updatedLente) {
        return service.update(id, updatedLente);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}