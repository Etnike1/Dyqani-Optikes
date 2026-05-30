package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Rezervimet;
import com.dyqanioptikes.backend.services.RezervimetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rezervimet")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class RezervimetController {

    private final RezervimetService service;

    public RezervimetController(
            RezervimetService service) {

        this.service = service;
    }

    @GetMapping
    public List<Rezervimet> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rezervimet> getById(
            @PathVariable Long id) {

        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }

    @PostMapping
    public Rezervimet create(
            @Valid @RequestBody Rezervimet rezervimi) {

        return service.save(rezervimi);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rezervimet> update(
            @PathVariable Long id,
            @Valid @RequestBody Rezervimet updated) {

        return service.getById(id)
                .map(rezervimi -> {

                    rezervimi.setKlienti(updated.getKlienti());
                    rezervimi.setPunonjesi(updated.getPunonjesi());
                    rezervimi.setDataRezervimit(
                            updated.getDataRezervimit());

                    rezervimi.setOraRezervimit(
                            updated.getOraRezervimit());

                    rezervimi.setStatusi(
                            updated.getStatusi());

                    rezervimi.setShenime(
                            updated.getShenime());

                    return ResponseEntity.ok(
                            service.save(rezervimi));
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