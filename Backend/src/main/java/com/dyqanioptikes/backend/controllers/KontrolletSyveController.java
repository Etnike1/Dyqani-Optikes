package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.KontrolliSyve;
import com.dyqanioptikes.backend.repositories.KontrolletSyveRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/kontrollet-syve")
@CrossOrigin(origins = "http://localhost:3000")
public class KontrolletSyveController {

    @Autowired
    private KontrolletSyveRepository repository;

    @GetMapping
    public List<KontrolliSyve> getAllKontrollet() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<KontrolliSyve> getKontrollById(
            @PathVariable Integer id) {

        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public KontrolliSyve createKontroll(
            @Valid @RequestBody KontrolliSyve kontrolli) {

        if (kontrolli.getDataKontrollit() == null) {
            kontrolli.setDataKontrollit(LocalDate.now());
        }

        return repository.save(kontrolli);
    }

    @PutMapping("/{id}")
    public ResponseEntity<KontrolliSyve> updateKontroll(
            @PathVariable Integer id,
            @Valid @RequestBody KontrolliSyve updatedKontroll) {

        return repository.findById(id)
                .map(kontroll -> {

                    kontroll.setKlient(updatedKontroll.getKlient());
                    kontroll.setPunonjesi(updatedKontroll.getPunonjesi());
                    kontroll.setReceteId(updatedKontroll.getReceteId());
                    kontroll.setDataKontrollit(updatedKontroll.getDataKontrollit());
                    kontroll.setRezultati(updatedKontroll.getRezultati());
                    kontroll.setRekomandimi(updatedKontroll.getRekomandimi());

                    return ResponseEntity.ok(repository.save(kontroll));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKontroll(@PathVariable Integer id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}