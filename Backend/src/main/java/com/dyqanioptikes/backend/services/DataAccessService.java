package com.dyqanioptikes.backend.services;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import com.dyqanioptikes.backend.security.SecurityUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class DataAccessService {

    private final KlientetRepository klientetRepository;

    public DataAccessService(KlientetRepository klientetRepository) {
        this.klientetRepository = klientetRepository;
    }

    public Long getCurrentKlientId() {
        return klientetRepository.findByUserId(SecurityUtils.getCurrentUserId())
                .map(Klientet::getId)
                .orElseThrow(() -> new AccessDeniedException("Client profile not linked to this account"));
    }

    public void assertClientOwnsKlient(Long klientId) {
        if (!SecurityUtils.isClient()) {
            return;
        }
        if (!getCurrentKlientId().equals(klientId)) {
            throw new AccessDeniedException("Access denied to another client's data");
        }
    }
}
