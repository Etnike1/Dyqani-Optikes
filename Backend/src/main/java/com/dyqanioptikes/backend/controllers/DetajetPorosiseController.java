package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.DetajetPorosise;
import com.dyqanioptikes.backend.services.DetajetPorosiseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detajet-porosise")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class DetajetPorosiseController {

    private final DetajetPorosiseService service;

    public DetajetPorosiseController(DetajetPorosiseService service) {
        this.service = service;
    }

    @GetMapping
    public List<DetajetPorosise> getAll() {
        return service.getAll();
    }

    @GetMapping("/porosia/{porosiId}")
    public List<DetajetPorosise> getByPorosia(@PathVariable Long porosiId) {
        return service.getByPorosiaId(porosiId);
    }

    @GetMapping("/{id}")
    public DetajetPorosise getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DetajetPorosise create(@Valid @RequestBody DetajetPorosise detaj) {
        return service.create(detaj);
    }

    @PutMapping("/{id}")
    public DetajetPorosise update(@PathVariable Long id, @Valid @RequestBody DetajetPorosise updatedDetaj) {
        return service.update(id, updatedDetaj);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}