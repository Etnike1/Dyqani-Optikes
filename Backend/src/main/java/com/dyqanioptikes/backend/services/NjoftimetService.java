package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Njoftimet;
import com.dyqanioptikes.backend.repositories.NjoftimetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NjoftimetService {

    private final NjoftimetRepository repository;

    public NjoftimetService(
            NjoftimetRepository repository) {

        this.repository = repository;
    }

    public List<Njoftimet> getAll() {
        return repository.findAll();
    }

    public Optional<Njoftimet> getById(Long id) {
        return repository.findById(id);
    }

    public Njoftimet save(Njoftimet njoftimi) {
        return repository.save(njoftimi);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}