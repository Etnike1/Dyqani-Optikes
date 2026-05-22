package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.DetajetPorosise;
import com.dyqanioptikes.backend.repositories.DetajetPorosiseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DetajetPorosiseService {

    private final DetajetPorosiseRepository repository;

    public DetajetPorosiseService(DetajetPorosiseRepository repository) {
        this.repository = repository;
    }

    public List<DetajetPorosise> getAll() {
        return repository.findAll();
    }

    public List<DetajetPorosise> getByPorosiaId(Long porosiId) {
        return repository.findByPorosia_PorosiId(porosiId);
    }

    public DetajetPorosise getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Detaji i porosisë nuk u gjet!"));
    }

    public DetajetPorosise create(DetajetPorosise detaj) {
        return repository.save(detaj);
    }

    public DetajetPorosise update(Long id, DetajetPorosise updatedDetaj) {
        return repository.findById(id).map(detaj -> {
            detaj.setSasia(updatedDetaj.getSasia());
            detaj.setCmimiNjesi(updatedDetaj.getCmimiNjesi());
            detaj.setPorosia(updatedDetaj.getPorosia());
            detaj.setProdukti(updatedDetaj.getProdukti());
            detaj.setLentet(updatedDetaj.getLentet());
            return repository.save(detaj);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Detaji i porosisë nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Detaji i porosisë nuk u gjet!");
        }
        repository.deleteById(id);
    }
}