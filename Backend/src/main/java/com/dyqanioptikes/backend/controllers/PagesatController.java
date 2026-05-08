package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Pagesat;
import com.dyqanioptikes.backend.repositories.PagesatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagesat")
@CrossOrigin(origins = "*")
public class PagesatController {

    @Autowired
    private PagesatRepository pagesatRepository;

    // 1. Merr listën e të gjitha pagesave (për raportet financiare)
    @GetMapping
    public List<Pagesat> getAllPagesat() {
        return pagesatRepository.findAll();
    }

    // 2. Regjistro një pagesë të re
    @PostMapping
    public Pagesat createPagese(@RequestBody Pagesat pagesa) {
        return pagesatRepository.save(pagesa);
    }

    // 3. Gjej listën e pagesave për një porosi specifike
    @GetMapping("/porosia/{porosiId}")
    public List<Pagesat> getPagesaByPorosia(@PathVariable Long porosiId) {
        // Përdorim variablën porosiId që vjen nga PathVariable
        // Dhe e kthejmë direkt si Listë (pa .map)
        return pagesatRepository.findByPorosiaPorosiId(porosiId);
    }

    // 4. Merr detajet e një pagese me ID
    @GetMapping("/{id}")
    public ResponseEntity<Pagesat> getPagesaById(@PathVariable Long id) {
        return pagesatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Fshi një regjistrim pagese (në rast gabimi)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePagese(@PathVariable Long id) {
        return pagesatRepository.findById(id)
                .map(pagesa -> {
                    pagesatRepository.delete(pagesa);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}