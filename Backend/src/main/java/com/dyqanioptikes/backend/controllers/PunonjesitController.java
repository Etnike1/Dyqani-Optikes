package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Punonjesit;
import com.dyqanioptikes.backend.services.PunonjesitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/punonjesit")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PunonjesitController {

    private final PunonjesitService service;

    public PunonjesitController(PunonjesitService service) {
        this.service = service;
    }

    @GetMapping
    public List<Punonjesit> getAll() {
        return service.getAll();
    }

    @GetMapping("/aktiv")
    public List<Punonjesit> getAktiv() {
        return service.getAktiv();
    }

    @GetMapping("/{id}")
    public Punonjesit getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Punonjesit create(@Valid @RequestBody Punonjesit punonjesit) {
        return service.create(punonjesit);
    }

    @PutMapping("/{id}")
    public Punonjesit update(@PathVariable Long id, @Valid @RequestBody Punonjesit updatedPunonjes) {
        return service.update(id, updatedPunonjes);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}