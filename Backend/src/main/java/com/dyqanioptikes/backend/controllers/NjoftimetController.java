package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Njoftimet;
import com.dyqanioptikes.backend.services.NjoftimetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/njoftimet")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class NjoftimetController {

    private final NjoftimetService service;

    public NjoftimetController(
            NjoftimetService service) {

        this.service = service;
    }

    @GetMapping
    public List<Njoftimet> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Njoftimet> getById(
            @PathVariable Long id) {

        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }

    @PostMapping
    public Njoftimet create(
            @Valid @RequestBody Njoftimet njoftimi) {

        return service.save(njoftimi);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Njoftimet> update(
            @PathVariable Long id,
            @Valid @RequestBody Njoftimet updated) {

        return service.getById(id)
                .map(njoftim -> {

                    njoftim.setKlienti(updated.getKlienti());

                    njoftim.setMesazhi(
                            updated.getMesazhi());

                    njoftim.setLexuar(
                            updated.getLexuar());

                    return ResponseEntity.ok(
                            service.save(njoftim));
                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.ok().build();
    }
}