package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Recetat;
import com.dyqanioptikes.backend.repositories.RecetatRepository;
import com.dyqanioptikes.backend.security.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RecetatService {

    private final RecetatRepository repository;
    private final DataAccessService dataAccessService;

    public RecetatService(RecetatRepository repository, DataAccessService dataAccessService) {
        this.repository = repository;
        this.dataAccessService = dataAccessService;
    }

    public List<Recetat> getAll() {
        if (SecurityUtils.isClient()) {
            return repository.findByKlient_Id(dataAccessService.getCurrentKlientId());
        }
        return repository.findAll();
    }

    public Recetat getById(Long id) {
        Recetat receta = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receta nuk u gjet!"));

        if (SecurityUtils.isClient()) {
            dataAccessService.assertClientOwnsKlient(receta.getKlient().getId());
        }

        return receta;
    }

    public Recetat create(Recetat receta) {
        if (SecurityUtils.isClient()) {
            throw new AccessDeniedException("Clients cannot create prescriptions");
        }
        return repository.save(receta);
    }

    public Recetat update(Long id, Recetat updatedReceta) {
        return repository.findById(id).map(receta -> {
            if (SecurityUtils.isClient()) {
                dataAccessService.assertClientOwnsKlient(receta.getKlient().getId());
                throw new AccessDeniedException("Clients cannot update prescriptions");
            }
            receta.setKlient(updatedReceta.getKlient());
            receta.setMjekuEmri(updatedReceta.getMjekuEmri());
            receta.setDataRecetes(updatedReceta.getDataRecetes());
            receta.setSyriDjathteSfera(updatedReceta.getSyriDjathteSfera());
            receta.setSyriDjathteCilindri(updatedReceta.getSyriDjathteCilindri());
            receta.setSyriMajteSfera(updatedReceta.getSyriMajteSfera());
            receta.setSyriMajteCilindri(updatedReceta.getSyriMajteCilindri());
            receta.setDistancaPupilare(updatedReceta.getDistancaPupilare());
            receta.setShenimet(updatedReceta.getShenimet());
            return repository.save(receta);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receta nuk u gjet!"));
    }

    public void delete(Long id) {
        if (SecurityUtils.isClient()) {
            throw new AccessDeniedException("Clients cannot delete prescriptions");
        }
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Receta nuk u gjet!");
        }
        repository.deleteById(id);
    }
}
