package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Pagesat;
import com.dyqanioptikes.backend.services.PagesatService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagesat")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PagesatController {

    private final PagesatService service;

    public PagesatController(PagesatService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pagesat> getAll() {
        return service.getAll();
    }

    @GetMapping("/porosia/{porosiId}")
    public List<Pagesat> getByPorosia(@PathVariable Long porosiId) {
        return service.getByPorosiaId(porosiId);
    }

    @GetMapping("/{id}")
    public Pagesat getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pagesat create(@Valid @RequestBody Pagesat pagesa) {
        return service.create(pagesa);
    }

    @PutMapping("/{id}")
    public Pagesat update(@PathVariable Long id, @Valid @RequestBody Pagesat updatedPagesa) {
        return service.update(id, updatedPagesa);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}