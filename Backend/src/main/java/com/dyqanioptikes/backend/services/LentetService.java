package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Lentet;
import com.dyqanioptikes.backend.repositories.LentetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LentetService {

    private final LentetRepository repository;

    public LentetService(LentetRepository repository) {
        this.repository = repository;
    }

    public List<Lentet> getAll() {
        return repository.findAll();
    }

    public Lentet getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lentja nuk u gjet!"));
    }

    public Lentet create(Lentet lente) {
        return repository.save(lente);
    }

    // FIXED: Updated to match the specific fields in your Lentet Model
    public Lentet update(Long id, Lentet updatedLente) {
        return repository.findById(id).map(lente -> {
            lente.setLlojiLentes(updatedLente.getLlojiLentes());
            lente.setProdhuesi(updatedLente.getProdhuesi());
            lente.setIndeksi(updatedLente.getIndeksi());
            lente.setVeshja(updatedLente.getVeshja());
            lente.setCmimi(updatedLente.getCmimi());
            lente.setSasiaStok(updatedLente.getSasiaStok());
            return repository.save(lente);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lentja nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Lentja nuk u gjet!");
        }
        repository.deleteById(id);
    }
}