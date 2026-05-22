package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Porosite;
import com.dyqanioptikes.backend.repositories.PorositeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PorositeService {

    private final PorositeRepository repository;

    public PorositeService(PorositeRepository repository) {
        this.repository = repository;
    }

    public List<Porosite> getAll() {
        return repository.findAll();
    }

    public Porosite getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Porosia nuk u gjet!"));
    }

    public Porosite create(Porosite porosia) {
        return repository.save(porosia);
    }

    public Porosite update(Long id, Porosite updatedPorosia) {
        return repository.findById(id).map(porosia -> {
            porosia.setKlient(updatedPorosia.getKlient());
            porosia.setReceta(updatedPorosia.getReceta());
            porosia.setPunonjesi(updatedPorosia.getPunonjesi());
            porosia.setTotali(updatedPorosia.getTotali());
            porosia.setStatusi(updatedPorosia.getStatusi());
            porosia.setDataGatshmerise(updatedPorosia.getDataGatshmerise());
            return repository.save(porosia);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Porosia nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Porosia nuk u gjet!");
        }
        repository.deleteById(id);
    }
}