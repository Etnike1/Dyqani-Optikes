package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Dergesat;
import com.dyqanioptikes.backend.repositories.DergesatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DergesatService {

    private final DergesatRepository repository;

    // Constructor Injection
    public DergesatService(DergesatRepository repository) {
        this.repository = repository;
    }

    public List<Dergesat> getAll() {
        return repository.findAll();
    }

    public List<Dergesat> getByPorosiaId(Long porosiId) {
        return repository.findByPorosia_PorosiId(porosiId);
    }

    public Dergesat getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dërgesa nuk u gjet!"));
    }

    public Dergesat create(Dergesat dergesa) {
        return repository.save(dergesa);
    }

    public Dergesat update(Long id, Dergesat updatedDergesa) {
        return repository.findById(id).map(dergesa -> {
            dergesa.setPorosia(updatedDergesa.getPorosia());
            dergesa.setKompaniaTransportit(updatedDergesa.getKompaniaTransportit());
            dergesa.setNumriGjurmimit(updatedDergesa.getNumriGjurmimit());
            dergesa.setAdresaDergeses(updatedDergesa.getAdresaDergeses());
            dergesa.setDataNisjes(updatedDergesa.getDataNisjes());
            dergesa.setDataArritjes(updatedDergesa.getDataArritjes());
            dergesa.setStatusiDergeses(updatedDergesa.getStatusiDergeses());
            return repository.save(dergesa);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dërgesa nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dërgesa nuk u gjet!");
        }
        repository.deleteById(id);
    }
}