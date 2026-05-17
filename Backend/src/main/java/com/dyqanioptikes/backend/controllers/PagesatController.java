package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Pagesat;
import com.dyqanioptikes.backend.repositories.PagesatRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagesat")
@CrossOrigin(origins = "http://localhost:3000")
public class PagesatController {

    @Autowired
    private PagesatRepository pagesatRepository;

    @GetMapping
    public List<Pagesat> getAllPagesat() {
        return pagesatRepository.findAll();
    }

    @PostMapping
    public Pagesat createPagese(
            @Valid @RequestBody Pagesat pagesa) {

        return pagesatRepository.save(pagesa);
    }

    @GetMapping("/porosia/{porosiId}")
    public List<Pagesat> getPagesaByPorosia(
            @PathVariable Long porosiId) {

        return pagesatRepository.findByPorosiaPorosiId(porosiId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagesat> getPagesaById(
            @PathVariable Long id) {

        return pagesatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pagesat> updatePagesa(
            @PathVariable Long id,
            @Valid @RequestBody Pagesat updatedPagesa) {

        return pagesatRepository.findById(id)
                .map(pagesa -> {

                    pagesa.setPorosia(updatedPagesa.getPorosia());
                    pagesa.setShuma(updatedPagesa.getShuma());
                    pagesa.setMetodaPageses(updatedPagesa.getMetodaPageses());

                    return ResponseEntity.ok(pagesatRepository.save(pagesa));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePagese(@PathVariable Long id) {

        if (pagesatRepository.existsById(id)) {
            pagesatRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}