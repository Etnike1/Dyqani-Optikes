package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Kategorite;
import com.dyqanioptikes.backend.repositories.KategoriteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class KategoriteService {

    private final KategoriteRepository repository;

    public KategoriteService(KategoriteRepository repository) {
        this.repository = repository;
    }

    public List<Kategorite> getAll() {
        return repository.findAll();
    }

    public Kategorite getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kategoria nuk u gjet!"));
    }

    public Kategorite create(Kategorite kategori) {
        return repository.save(kategori);
    }

    public Kategorite update(Long id, Kategorite updatedKategori) {
        return repository.findById(id).map(kategori -> {
            kategori.setEmriKategorise(updatedKategori.getEmriKategorise()); // Verify your Model field name
            kategori.setPershkrimi(updatedKategori.getPershkrimi()); // Verify your Model field name
            kategori.setAktive(updatedKategori.getAktive());
            return repository.save(kategori);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kategoria nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kategoria nuk u gjet!");
        }
        repository.deleteById(id);
    }
}
