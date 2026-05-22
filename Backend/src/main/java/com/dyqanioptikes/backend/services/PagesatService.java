package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Pagesat;
import com.dyqanioptikes.backend.repositories.PagesatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PagesatService {

    private final PagesatRepository repository;

    public PagesatService(PagesatRepository repository) {
        this.repository = repository;
    }

    public List<Pagesat> getAll() {
        return repository.findAll();
    }

    public List<Pagesat> getByPorosiaId(Long porosiId) {
        return repository.findByPorosia_PorosiId(porosiId);
    }

    public Pagesat getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagesa nuk u gjet!"));
    }

    public Pagesat create(Pagesat pagesa) {
        return repository.save(pagesa);
    }

    public Pagesat update(Long id, Pagesat updatedPagesa) {
        return repository.findById(id).map(pagesa -> {
            pagesa.setPorosia(updatedPagesa.getPorosia());
            pagesa.setShuma(updatedPagesa.getShuma());
            pagesa.setMetodaPageses(updatedPagesa.getMetodaPageses());
            return repository.save(pagesa);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagesa nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagesa nuk u gjet!");
        }
        repository.deleteById(id);
    }
}