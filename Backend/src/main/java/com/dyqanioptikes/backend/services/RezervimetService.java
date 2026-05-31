package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Rezervimet;
import com.dyqanioptikes.backend.repositories.RezervimetRepository;
import com.dyqanioptikes.backend.security.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class RezervimetService {

    private final RezervimetRepository repository;
    private final DataAccessService dataAccessService;

    public RezervimetService(RezervimetRepository repository, DataAccessService dataAccessService) {
        this.repository = repository;
        this.dataAccessService = dataAccessService;
    }

    public List<Rezervimet> getAll() {
        if (SecurityUtils.isClient()) {
            return repository.findByKlienti_Id(dataAccessService.getCurrentKlientId());
        }
        return repository.findAll();
    }

    public Optional<Rezervimet> getById(Long id) {
        Optional<Rezervimet> rezervimi = repository.findById(id);
        rezervimi.ifPresent(r -> {
            if (SecurityUtils.isClient()) {
                dataAccessService.assertClientOwnsKlient(r.getKlienti().getId());
            }
        });
        return rezervimi;
    }

    public Rezervimet save(Rezervimet rezervimi) {
        if (SecurityUtils.isClient()) {
            Long klientId = dataAccessService.getCurrentKlientId();
            if (rezervimi.getKlienti() == null || !rezervimi.getKlienti().getId().equals(klientId)) {
                throw new AccessDeniedException("Clients may only create reservations for themselves");
            }
        }
        return repository.save(rezervimi);
    }

    public void delete(Long id) {
        Rezervimet rezervimi = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rezervimi nuk u gjet"));
        if (SecurityUtils.isClient()) {
            dataAccessService.assertClientOwnsKlient(rezervimi.getKlienti().getId());
        } else if (!SecurityUtils.isStaff()) {
            throw new AccessDeniedException("Access denied");
        }
        repository.deleteById(id);
    }
}
