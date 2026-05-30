package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Inventari;
import com.dyqanioptikes.backend.services.InventariService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventari")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class InventariController {

    private final InventariService service;

    public InventariController(InventariService service) {
        this.service = service;
    }

    @GetMapping
    public List<Inventari> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Inventari getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Inventari create(@RequestBody Inventari inventari) {
        return service.create(inventari);
    }

    @PutMapping("/{id}")
    public Inventari update(@PathVariable Long id, @RequestBody Inventari updatedInventari) {
        return service.update(id, updatedInventari);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}