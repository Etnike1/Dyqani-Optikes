package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Furnitoret;
import com.dyqanioptikes.backend.repositories.FurnitoretRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FurnitoretService {

    private final FurnitoretRepository repository;

    public FurnitoretService(FurnitoretRepository repository) {
        this.repository = repository;
    }

    public List<Furnitoret> getAll() {
        return repository.findAll();
    }

    public Furnitoret getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Furnitori nuk u gjet!"));
    }

    public Furnitoret create(Furnitoret furnitori) {
        return repository.save(furnitori);
    }

    // FIXED: Updated to match the fields in your Furnitoret Model
    public Furnitoret update(Long id, Furnitoret updatedFurnitori) {
        return repository.findById(id).map(furnitori -> {
            furnitori.setEmriKompanise(updatedFurnitori.getEmriKompanise());
            furnitori.setPersoniKontaktit(updatedFurnitori.getPersoniKontaktit());
            furnitori.setEmail(updatedFurnitori.getEmail());
            furnitori.setTelefoni(updatedFurnitori.getTelefoni());
            furnitori.setProduktetFurnizuara(updatedFurnitori.getProduktetFurnizuara());
            return repository.save(furnitori);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Furnitori nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Furnitori nuk u gjet!");
        }
        repository.deleteById(id);
    }
}