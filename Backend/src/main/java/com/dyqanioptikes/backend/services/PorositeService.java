package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Porosite;
import com.dyqanioptikes.backend.repositories.PorositeRepository;
import com.dyqanioptikes.backend.security.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PorositeService {

    private final PorositeRepository repository;
    private final DataAccessService dataAccessService;

    public PorositeService(PorositeRepository repository, DataAccessService dataAccessService) {
        this.repository = repository;
        this.dataAccessService = dataAccessService;
    }

    public List<Porosite> getAll() {
        if (SecurityUtils.isClient()) {
            return repository.findByKlient_Id(dataAccessService.getCurrentKlientId());
        }
        return repository.findAll();
    }

    public Porosite getById(Long id) {
        Porosite porosia = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Porosia nuk u gjet!"));

        if (SecurityUtils.isClient()) {
            dataAccessService.assertClientOwnsKlient(porosia.getKlient().getId());
        }

        return porosia;
    }

    public Porosite create(Porosite porosia) {
        if (SecurityUtils.isClient()) {
            Long klientId = dataAccessService.getCurrentKlientId();
            if (porosia.getKlient() == null || !porosia.getKlient().getId().equals(klientId)) {
                throw new AccessDeniedException("Clients may only create orders for themselves");
            }
        }
        return repository.save(porosia);
    }

    public Porosite update(Long id, Porosite updatedPorosia) {
        return repository.findById(id).map(porosia -> {
            if (SecurityUtils.isClient()) {
                dataAccessService.assertClientOwnsKlient(porosia.getKlient().getId());
            }
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
        if (SecurityUtils.isClient()) {
            throw new AccessDeniedException("Clients cannot delete orders");
        }
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Porosia nuk u gjet!");
        }
        repository.deleteById(id);
    }
}
