package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Inventari;
import com.dyqanioptikes.backend.repositories.InventariRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InventariService {

    private final InventariRepository repository;

    public InventariService(InventariRepository repository) {
        this.repository = repository;
    }

    public List<Inventari> getAll() {
        return repository.findAll();
    }

    public Inventari getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inventari nuk u gjet!"));
    }

    public Inventari create(Inventari inventari) {
        return repository.save(inventari);
    }

    public Inventari update(Long id, Inventari updatedInventari) {
        return repository.findById(id).map(inventari -> {
            inventari.setProdukt(updatedInventari.getProdukt());
            inventari.setSasiaAktuale(updatedInventari.getSasiaAktuale());
            inventari.setSasiaMinimale(updatedInventari.getSasiaMinimale());
            return repository.save(inventari);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inventari nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Inventari nuk u gjet!");
        }
        repository.deleteById(id);
    }
}