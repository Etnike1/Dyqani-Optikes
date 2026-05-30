package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.services.KlientetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/klientet")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class KlientetController {

    private final KlientetService service;

    // Constructor Injection replaces @Autowired
    public KlientetController(KlientetService service) {
        this.service = service;
    }

    @GetMapping
    public List<Klientet> getAll() {
        return service.getAllKlientet();
    }

    @GetMapping("/{id}")
    public Klientet getById(@PathVariable Long id) {
        return service.getKlientById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Klientet create(@Valid @RequestBody Klientet klient) {
        return service.createKlient(klient);
    }

    @PutMapping("/{id}")
    public Klientet update(@PathVariable Long id, @Valid @RequestBody Klientet updatedKlient) {
        return service.updateKlient(id, updatedKlient);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteKlient(id);
    }
}