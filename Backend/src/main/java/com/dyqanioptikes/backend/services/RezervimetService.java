package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Rezervimet;
import com.dyqanioptikes.backend.repositories.RezervimetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RezervimetService {

    private final RezervimetRepository repository;

    public RezervimetService(RezervimetRepository repository) {
        this.repository = repository;
    }

    public List<Rezervimet> getAll() {
        return repository.findAll();
    }

    public Optional<Rezervimet> getById(Long id) {
        return repository.findById(id);
    }

    public Rezervimet save(Rezervimet rezervimi) {
        return repository.save(rezervimi);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}