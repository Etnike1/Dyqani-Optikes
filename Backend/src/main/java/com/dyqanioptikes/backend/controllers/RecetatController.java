package com.dyqanioptikes.backend.controllers;

import com.dyqanioptikes.backend.models.Recetat;
import com.dyqanioptikes.backend.repositories.RecetatRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetat")
@CrossOrigin(origins = "http://localhost:3000")
public class RecetatController {

    @Autowired
    private RecetatRepository recetaRepository;

    @GetMapping
    public List<Recetat> getAllRecetat() {
        return recetaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recetat> getRecetaById(
            @PathVariable Long id) {

        return recetaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Recetat createReceta(
            @Valid @RequestBody Recetat receta) {

        return recetaRepository.save(receta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recetat> updateReceta(
            @PathVariable Long id,
            @Valid @RequestBody Recetat updatedReceta) {

        return recetaRepository.findById(id)
                .map(receta -> {

                    receta.setKlient(updatedReceta.getKlient());

                    receta.setMjekuEmri(
                            updatedReceta.getMjekuEmri());

                    receta.setDataRecetes(
                            updatedReceta.getDataRecetes());

                    receta.setSyriDjathteSfera(
                            updatedReceta.getSyriDjathteSfera());

                    receta.setSyriDjathteCilindri(
                            updatedReceta.getSyriDjathteCilindri());

                    receta.setSyriMajteSfera(
                            updatedReceta.getSyriMajteSfera());

                    receta.setSyriMajteCilindri(
                            updatedReceta.getSyriMajteCilindri());

                    receta.setDistancaPupilare(
                            updatedReceta.getDistancaPupilare());

                    receta.setShenimet(
                            updatedReceta.getShenimet());

                    return ResponseEntity.ok(
                            recetaRepository.save(receta));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceta(
            @PathVariable Long id) {

        if (recetaRepository.existsById(id)) {

            recetaRepository.deleteById(id);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}