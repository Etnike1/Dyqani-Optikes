package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Punonjesit;
import com.dyqanioptikes.backend.repositories.PunonjesitRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PunonjesitService {

    private final PunonjesitRepository repository;

    public PunonjesitService(PunonjesitRepository repository) {
        this.repository = repository;
    }

    public List<Punonjesit> getAll() {
        return repository.findAll();
    }

    public List<Punonjesit> getAktiv() {
        return repository.findByAktivTrue();
    }

    public Punonjesit getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Punonjësi nuk u gjet!"));
    }

    public Punonjesit create(Punonjesit punonjesi) {
        return repository.save(punonjesi);
    }

    public Punonjesit update(Long id, Punonjesit updatedPunonjes) {
        return repository.findById(id).map(punonjes -> {
            punonjes.setEmri(updatedPunonjes.getEmri());
            punonjes.setMbiemri(updatedPunonjes.getMbiemri());
            punonjes.setRoli(updatedPunonjes.getRoli());
            punonjes.setEmail(updatedPunonjes.getEmail());
            punonjes.setTelefoni(updatedPunonjes.getTelefoni());
            punonjes.setAktiv(updatedPunonjes.getAktiv());
            return repository.save(punonjes);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Punonjësi nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Punonjësi nuk u gjet!");
        }
        repository.deleteById(id);
    }
}