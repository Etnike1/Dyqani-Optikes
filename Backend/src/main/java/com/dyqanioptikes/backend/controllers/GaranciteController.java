package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Garancite;
import com.dyqanioptikes.backend.services.GaranciteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garancite")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class GaranciteController {

    private final GaranciteService service;

    public GaranciteController(GaranciteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Garancite> getAll() {
        return service.getAll();
    }

    @GetMapping("/porosia/{porosiId}")
    public List<Garancite> getByPorosia(@PathVariable Long porosiId) {
        return service.getByPorosiaId(porosiId);
    }

    @GetMapping("/klienti/{klientId}")
    public List<Garancite> getByKlient(@PathVariable Long klientId) {
        return service.getByKlientId(klientId);
    }

    @GetMapping("/{id}")
    public Garancite getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Garancite create(@Valid @RequestBody Garancite garancia) {
        return service.create(garancia);
    }

    @PutMapping("/{id}")
    public Garancite update(@PathVariable Long id, @Valid @RequestBody Garancite updatedGarancia) {
        return service.update(id, updatedGarancia);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}