package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.KontrolletSyve;
import com.dyqanioptikes.backend.repositories.KontrolletSyveRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class KontrolletSyveService {

    private final KontrolletSyveRepository repository;

    public KontrolletSyveService(KontrolletSyveRepository repository) {
        this.repository = repository;
    }

    public List<KontrolletSyve> getAll() {
        return repository.findAll();
    }

    public KontrolletSyve getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kontrolli nuk u gjet!"));
    }

    public KontrolletSyve create(KontrolletSyve kontrolli) {
        return repository.save(kontrolli);
    }

    public KontrolletSyve update(Long id, KontrolletSyve updatedKontrolli) {
        return repository.findById(id).map(kontrolli -> {
            kontrolli.setKlient(updatedKontrolli.getKlient());
            kontrolli.setPunonjesi(updatedKontrolli.getPunonjesi());
            kontrolli.setReceteId(updatedKontrolli.getReceteId());
            kontrolli.setDataKontrollit(updatedKontrolli.getDataKontrollit());
            kontrolli.setRezultati(updatedKontrolli.getRezultati());
            kontrolli.setRekomandimi(updatedKontrolli.getRekomandimi());
            return repository.save(kontrolli);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kontrolli nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kontrolli nuk u gjet!");
        }
        repository.deleteById(id);
    }
}