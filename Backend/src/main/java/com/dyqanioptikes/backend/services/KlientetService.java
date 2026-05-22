package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class KlientetService {

    private final KlientetRepository repository;

    // Constructor Injection replaces @Autowired
    public KlientetService(KlientetRepository repository) {
        this.repository = repository;
    }

    public List<Klientet> getAllKlientet() {
        return repository.findAll();
    }

    public Klientet getKlientById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Klienti nuk u gjet!"));
    }

    public Klientet createKlient(Klientet klient) {
        return repository.save(klient);
    }

    public Klientet updateKlient(Long id, Klientet updatedKlient) {
        return repository.findById(id)
                .map(klient -> {
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
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Klienti nuk u gjet!");
        }
        repository.deleteById(id);
    }
}