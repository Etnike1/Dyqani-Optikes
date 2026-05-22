package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Garancite;
import com.dyqanioptikes.backend.repositories.GaranciteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class GaranciteService {

    private final GaranciteRepository repository;

    public GaranciteService(GaranciteRepository repository) {
        this.repository = repository;
    }

    public List<Garancite> getAll() {
        return repository.findAll();
    }

    public List<Garancite> getByPorosiaId(Long porosiId) {
        return repository.findByPorosia_PorosiId(porosiId);
    }

    public List<Garancite> getByKlientId(Long klientId) {
        return repository.findByKlienti_Id(klientId);
    }

    public Garancite getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Garancia nuk u gjet!"));
    }

    public Garancite create(Garancite garancia) {
        return repository.save(garancia);
    }

    public Garancite update(Long id, Garancite updatedGarancia) {
        return repository.findById(id).map(garancia -> {
            garancia.setDataFillimit(updatedGarancia.getDataFillimit());
            garancia.setDataSkadimit(updatedGarancia.getDataSkadimit());
            garancia.setKushtet(updatedGarancia.getKushtet());
            garancia.setPorosia(updatedGarancia.getPorosia());
            garancia.setKlienti(updatedGarancia.getKlienti());
            garancia.setProdukti(updatedGarancia.getProdukti());
            garancia.setLentet(updatedGarancia.getLentet());
            return repository.save(garancia);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Garancia nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Garancia nuk u gjet!");
        }
        repository.deleteById(id);
    }
}