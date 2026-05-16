package com.dyqanioptikes.backend.controller;

import com.dyqanioptikes.backend.model.DetajetPorosise;
import com.dyqanioptikes.backend.repository.DetajetPorosiseRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detajet-porosise")
@CrossOrigin(origins = "http://localhost:3000")
public class DetajetPorosiseController {

    @Autowired
    private DetajetPorosiseRepository detajetRepository;

    @GetMapping
    public List<DetajetPorosise> getAll() {
        return detajetRepository.findAll();
    }

    @GetMapping("/porosia/{id}")
    public List<DetajetPorosise> getByPorosia(@PathVariable Integer id) {
        return detajetRepository.findByPorosia_PorosiId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetajetPorosise> getById(@PathVariable Integer id) {
        return detajetRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DetajetPorosise shto(@Valid @RequestBody DetajetPorosise detaj) {
        return detajetRepository.save(detaj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetajetPorosise> update(
            @PathVariable Integer id,
            @Valid @RequestBody DetajetPorosise updatedDetaj) {

        return detajetRepository.findById(id)
                .map(detaj -> {

                    detaj.setSasia(updatedDetaj.getSasia());
                    detaj.setCmimiNjesi(updatedDetaj.getCmimiNjesi());
                    detaj.setPorosia(updatedDetaj.getPorosia());
                    detaj.setProdukti(updatedDetaj.getProdukti());
                    detaj.setLentet(updatedDetaj.getLentet());

                    return ResponseEntity.ok(detajetRepository.save(detaj));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> fshij(@PathVariable Integer id) {

        if (detajetRepository.existsById(id)) {
            detajetRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}