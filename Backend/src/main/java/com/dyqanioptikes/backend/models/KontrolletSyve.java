package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "KontrolletSyve")
@Data
public class KontrolletSyve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kontroll_id")
    private Long kontrollId;

    @ManyToOne
    @JoinColumn(name = "klient_id")
    private Klientet klient;

    @ManyToOne
    @JoinColumn(name = "punonjes_id")
    private Punonjesit punonjesi;

    @Column(name = "recete_id") // Added
    private Long receteId;

    @Column(name = "data_kontrollit")
    private LocalDate dataKontrollit;

    @Column(name = "rezultati")
    private String rezultati;

    @Column(name = "rekomandimi") // Added
    private String rekomandimi;
}
