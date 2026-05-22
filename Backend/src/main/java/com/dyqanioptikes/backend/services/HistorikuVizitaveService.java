package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.HistorikuVizitave;
import com.dyqanioptikes.backend.repositories.HistorikuVizitaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistorikuVizitaveService {

    private final HistorikuVizitaveRepository repository;

    public HistorikuVizitaveService(
            HistorikuVizitaveRepository repository) {

        this.repository = repository;
    }

    public List<HistorikuVizitave> getAll() {
        return repository.findAll();
    }

    public Optional<HistorikuVizitave> getById(Long id) {
        return repository.findById(id);
    }

    public HistorikuVizitave save(
            HistorikuVizitave historiku) {

        return repository.save(historiku);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}