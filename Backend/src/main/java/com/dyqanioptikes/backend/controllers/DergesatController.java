package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Dergesat;
import com.dyqanioptikes.backend.repositories.DergesatRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dergesat")
@CrossOrigin(origins = "http://localhost:3000")
public class DergesatController {

    @Autowired
    private DergesatRepository dergesatRepository;

    // 1. READ (Merr të gjitha dërgesat)
    @GetMapping
    public List<Dergesat> getAll() {
        return dergesatRepository.findAll();
    }

    // 2. READ (Sipas ID-së së Porosisë - Pranon Long sepse porosiId është Long)
    @GetMapping("/porosia/{id}")
    public List<Dergesat> getByPorosia(@PathVariable Long id) {
        return dergesatRepository.findByPorosia_PorosiId(id);
    }

    // 3. READ (Sipas ID-së së vetë Dërgesës - Pranon Integer)
    @GetMapping("/{id}")
    public ResponseEntity<Dergesat> getById(@PathVariable Integer id) {
        return dergesatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. CREATE (Shto dërgesë të re)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // Kthen 201 Created
    public Dergesat shto(@Valid @RequestBody Dergesat dergesa) {
        return dergesatRepository.save(dergesa);
    }

    // 5. UPDATE (Përditëso dërgesë)
    @PutMapping("/{id}")
    public ResponseEntity<Dergesat> update(
            @PathVariable Integer id,
            @Valid @RequestBody Dergesat updatedDergesa) {

        return dergesatRepository.findById(id)
                .map(dergesa -> {
                    dergesa.setPorosia(updatedDergesa.getPorosia());
                    dergesa.setKompaniaTransportit(updatedDergesa.getKompaniaTransportit());
                    dergesa.setNumriGjurmimit(updatedDergesa.getNumriGjurmimit());
                    dergesa.setAdresaDergeses(updatedDergesa.getAdresaDergeses());
                    dergesa.setDataNisjes(updatedDergesa.getDataNisjes());

                    // U rregullua fiks si te modeli yt: dataMrrgjetjes
                    dergesa.setDataMrrgjetjes(updatedDergesa.getDataMrrgjetjes());
                    dergesa.setStatusiDergeses(updatedDergesa.getStatusiDergeses());

                    return ResponseEntity.ok(dergesatRepository.save(dergesa));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 6. DELETE (Fshij dërgesë)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> fshij(@PathVariable Integer id) {
        if (dergesatRepository.existsById(id)) {
            dergesatRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Kthen 204 No Content
        }
        return ResponseEntity.notFound().build();
    }
}