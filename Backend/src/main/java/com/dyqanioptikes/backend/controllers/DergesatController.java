package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Dergesat;
import com.dyqanioptikes.backend.services.DergesatService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dergesat")
@CrossOrigin(origins = "http://localhost:3000")
public class DergesatController {

    private final DergesatService service;


    public DergesatController(DergesatService service) {
        this.service = service;
    }

    @GetMapping
    public List<Dergesat> getAll() {
        return service.getAll();
    }

    @GetMapping("/porosia/{porosiId}")
    public List<Dergesat> getByPorosia(@PathVariable Long porosiId) {
        return service.getByPorosiaId(porosiId);
    }

    @GetMapping("/{id}")
    public Dergesat getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Dergesat create(@Valid @RequestBody Dergesat dergesa) {
        return service.create(dergesa);
    }

    @PutMapping("/{id}")
    public Dergesat update(@PathVariable Long id, @Valid @RequestBody Dergesat updatedDergesa) {
        return service.update(id, updatedDergesa);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}