package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Ky anotacion i thotë Spring Boot që kjo klasë është Shtresa Service
public class KlientetService {

    @Autowired
    private KlientetRepository klientetRepository;

    // 1. Merr të gjithë klientët
    public List<Klientet> getAllKlientet() {
        return klientetRepository.findAll();
    }

    // 2. Ruaj një klient të ri
    public Klientet createKlient(Klientet klient) {
        return klientetRepository.save(klient);
    }

    // 3. Përditëso klientin (E gjithë logjika e biznesit zhvendoset këtu!)
    public Klientet updateKlient(Long id, Klientet updatedKlient) {
        return klientetRepository.findById(id)
                .map(klient -> {
                    klient.setEmri(updatedKlient.getEmri());
                    klient.setMbiemri(updatedKlient.getMbiemri());
                    klient.setEmail(updatedKlient.getEmail());
                    klient.setTelefoni(updatedKlient.getTelefoni());
                    klient.setDataLindjes(updatedKlient.getDataLindjes());
                    klient.setAdresa(updatedKlient.getAdresa());
                    return klientetRepository.save(klient);
                })
                .orElseThrow(() -> new RuntimeException("Klienti nuk u gjet me ID: " + id));
    }

    // 4. Fshij një klient
    public void deleteKlient(Long id) {
        klientetRepository.deleteById(id);
    }
}