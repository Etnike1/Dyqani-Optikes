package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "HistorikuVizitave")
@Data
public class HistorikuVizitave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historiku_id")
    private Long historikuId;

    @ManyToOne
    @JoinColumn(name = "klient_id", nullable = false)
    private Klientet klienti;

    @ManyToOne
    @JoinColumn(name = "kontroll_id")
    private KontrolletSyve kontrolli;

    @Column(name = "data_vizites")
    private LocalDate dataVizites;

    private String pershkrimi;

    private String rekomandimi;

    @PrePersist
    protected void onCreate() {
        if (this.dataVizites == null) {
            this.dataVizites = LocalDate.now();
        }
    }
}