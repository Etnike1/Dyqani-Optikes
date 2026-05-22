package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Recetat;
import com.dyqanioptikes.backend.repositories.RecetatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RecetatService {

    private final RecetatRepository repository;

    public RecetatService(RecetatRepository repository) {
        this.repository = repository;
    }

    public List<Recetat> getAll() {
        return repository.findAll();
    }

    public Recetat getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receta nuk u gjet!"));
    }

    public Recetat create(Recetat receta) {
        return repository.save(receta);
    }

    public Recetat update(Long id, Recetat updatedReceta) {
        return repository.findById(id).map(receta -> {
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
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Receta nuk u gjet!");
        }
        repository.deleteById(id);
    }
}