package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Rezervimet")
@Data
public class Rezervimet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rezervim_id")
    private Long rezervimId;

    @ManyToOne
    @JoinColumn(name = "klient_id", nullable = false)
    private Klientet klienti;

    @ManyToOne
    @JoinColumn(name = "punonjes_id", nullable = false)
    private Punonjesit punonjesi;

    @NotNull
    @Column(name = "data_rezervimit")
    private LocalDate dataRezervimit;

    @NotNull
    @Column(name = "ora_rezervimit")
    private LocalTime oraRezervimit;

    private String statusi;

    private String shenime;
}