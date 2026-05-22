package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.HistorikuVizitave;
import com.dyqanioptikes.backend.services.HistorikuVizitaveService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historiku-vizitave")
@CrossOrigin(origins = "http://localhost:3000")
public class HistorikuVizitaveController {

    private final HistorikuVizitaveService service;

    public HistorikuVizitaveController(
            HistorikuVizitaveService service) {

        this.service = service;
    }

    @GetMapping
    public List<HistorikuVizitave> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistorikuVizitave> getById(
            @PathVariable Long id) {

        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }

    @PostMapping
    public HistorikuVizitave create(
            @Valid @RequestBody HistorikuVizitave historiku) {

        return service.save(historiku);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HistorikuVizitave> update(
            @PathVariable Long id,
            @Valid @RequestBody HistorikuVizitave updated) {

        return service.getById(id)
                .map(historiku -> {

                    historiku.setKlienti(updated.getKlienti());

                    historiku.setKontrolli(
                            updated.getKontrolli());

                    historiku.setPershkrimi(
                            updated.getPershkrimi());

                    historiku.setRekomandimi(
                            updated.getRekomandimi());

                    return ResponseEntity.ok(
                            service.save(historiku));
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