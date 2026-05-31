package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import com.dyqanioptikes.backend.security.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class KlientetService {

    private final KlientetRepository repository;
    private final DataAccessService dataAccessService;

    public KlientetService(KlientetRepository repository, DataAccessService dataAccessService) {
        this.repository = repository;
        this.dataAccessService = dataAccessService;
    }

    public List<Klientet> getAllKlientet() {
        if (SecurityUtils.isClient()) {
            return List.of(getMyProfile());
        }
        return repository.findAll();
    }

    public Klientet getKlientById(Long id) {
        Klientet klient = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Klienti nuk u gjet!"));

        if (SecurityUtils.isClient()) {
            dataAccessService.assertClientOwnsKlient(klient.getId());
        }

        return klient;
    }

    public Klientet getMyProfile() {
        if (!SecurityUtils.isClient()) {
            throw new AccessDeniedException("Only clients have a self profile endpoint");
        }
        return repository.findByUserId(SecurityUtils.getCurrentUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profili nuk u gjet"));
    }

    public Klientet createKlient(Klientet klient) {
        if (SecurityUtils.isClient()) {
            throw new AccessDeniedException("Clients cannot create customer records");
        }
        return repository.save(klient);
    }

    public Klientet updateKlient(Long id, Klientet updatedKlient) {
        return repository.findById(id)
                .map(klient -> {
                    if (SecurityUtils.isClient()) {
                        dataAccessService.assertClientOwnsKlient(klient.getId());
                    }
                    klient.setEmri(updatedKlient.getEmri());
                    klient.setMbiemri(updatedKlient.getMbiemri());
                    klient.setEmail(updatedKlient.getEmail());
                    klient.setTelefoni(updatedKlient.getTelefoni());
                    klient.setDataLindjes(updatedKlient.getDataLindjes());
                    klient.setAdresa(updatedKlient.getAdresa());
                    return repository.save(klient);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Klienti nuk u gjet me ID: " + id));
    }

    public void deleteKlient(Long id) {
        if (SecurityUtils.isClient()) {
            throw new AccessDeniedException("Clients cannot delete customer records");
        }
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Klienti nuk u gjet!");
        }
        repository.deleteById(id);
    }
}
