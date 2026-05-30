package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.KontrolletSyve;
import com.dyqanioptikes.backend.services.KontrolletSyveService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kontrolletsyve")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class KontrolletSyveController {

    private final KontrolletSyveService service;

    public KontrolletSyveController(KontrolletSyveService service) {
        this.service = service;
    }

    @GetMapping
    public List<KontrolletSyve> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public KontrolletSyve getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public KontrolletSyve create(@Valid @RequestBody KontrolletSyve kontrolli) {
        return service.create(kontrolli);
    }

    @PutMapping("/{id}")
    public KontrolletSyve update(@PathVariable Long id, @Valid @RequestBody KontrolletSyve updatedKontrolli) {
        return service.update(id, updatedKontrolli);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}