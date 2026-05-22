package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Produktet;
import com.dyqanioptikes.backend.repositories.ProduktetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProduktetService {

    private final ProduktetRepository repository;

    public ProduktetService(ProduktetRepository repository) {
        this.repository = repository;
    }

    public List<Produktet> getAll() {
        return repository.findAll();
    }

    public Produktet getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produkti nuk u gjet!"));
    }

    public Produktet create(Produktet produkt) {
        return repository.save(produkt);
    }

    public Produktet update(Long id, Produktet updatedProdukt) {
        return repository.findById(id).map(produkt -> {
            produkt.setEmriProduktit(updatedProdukt.getEmriProduktit());
            produkt.setMarka(updatedProdukt.getMarka());
            produkt.setModeli(updatedProdukt.getModeli());
            produkt.setCmimi(updatedProdukt.getCmimi());
            produkt.setSasiaStok(updatedProdukt.getSasiaStok());
            produkt.setNgjyra(updatedProdukt.getNgjyra());
            produkt.setMateriali(updatedProdukt.getMateriali());
            produkt.setAktiv(updatedProdukt.getAktiv());
            produkt.setKategori(updatedProdukt.getKategori());
            return repository.save(produkt);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produkti nuk u gjet!"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produkti nuk u gjet!");
        }
        repository.deleteById(id);
    }
}