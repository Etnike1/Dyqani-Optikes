package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Garancite;
import com.dyqanioptikes.backend.repositories.GaranciteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garancite")
@CrossOrigin(origins = "http://localhost:3000")
public class GaranciteController {

    @Autowired
    private GaranciteRepository garanciteRepository;

    @GetMapping
    public List<Garancite> getAll() {
        return garanciteRepository.findAll();
    }

    // Pranon Long sepse porosi_id është Long në Java
    @GetMapping("/porosia/{id}")
    public List<Garancite> getByPorosia(@PathVariable Long id) {
        return garanciteRepository.findByPorosia_PorosiId(id);
    }

    // Pranon Long sepse klient_id është Long në Java
    @GetMapping("/klienti/{id}")
    public List<Garancite> getByKlient(@PathVariable Long id) {
        return garanciteRepository.findByKlienti_Id(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Garancite> getById(@PathVariable Integer id) {
        return garanciteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Garancite shto(@Valid @RequestBody Garancite garancia) {
        return garanciteRepository.save(garancia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Garancite> update(
            @PathVariable Integer id,
            @Valid @RequestBody Garancite updatedGarancia) {

        return garanciteRepository.findById(id)
                .map(garancia -> {
                    garancia.setDataFillimit(updatedGarancia.getDataFillimit());
                    garancia.setDataSkadimit(updatedGarancia.getDataSkadimit());
                    garancia.setKushtet(updatedGarancia.getKushtet());
                    garancia.setPorosia(updatedGarancia.getPorosia());
                    garancia.setKlienti(updatedGarancia.getKlienti());
                    garancia.setProdukti(updatedGarancia.getProdukti());
                    garancia.setLentet(updatedGarancia.getLentet());

                    return ResponseEntity.ok(garanciteRepository.save(garancia));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> fshij(@PathVariable Integer id) {
        if (garanciteRepository.existsById(id)) {
            garanciteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}