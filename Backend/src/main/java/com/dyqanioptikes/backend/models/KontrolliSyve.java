package com.dyqanioptikes.backend.model; // Fixed package name

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "Kontrollet_Syve")
@Data
public class KontrolliSyve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kontroll_id")
    private Integer kontrollId;

    @ManyToOne
    @JoinColumn(name = "klient_id")
    private Klientet klient;

    @ManyToOne
    @JoinColumn(name = "punonjes_id")
    private Punonjesit punonjesi;

    @Column(name = "recete_id") // Added
    private Integer receteId;

    @Column(name = "data_kontrollit")
    private LocalDate dataKontrollit;

    @Column(name = "rezultati")
    private String rezultati;

    @Column(name = "rekomandimi") // Added
    private String rekomandimi;
}
