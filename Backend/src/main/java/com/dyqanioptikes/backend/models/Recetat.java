package com.dyqanioptikes.backend.models; // KJO DUHET TË JETË LINJA E PARË

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "Recetat")
@Data
public class Recetat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recete_id")
    private Long receteId;

    @ManyToOne
    @JoinColumn(name = "klient_id", nullable = false)
    private Klientet klient;

    @Column(name = "mjeku_emri")
    private String mjekuEmri;

    @Column(name = "data_recetes")
    private LocalDate dataRecetes;

    @Column(name = "syri_djathte_sfera")
    private Double syriDjathteSfera;

    @Column(name = "syri_djathte_cilindri")
    private Double syriDjathteCilindri;

    @Column(name = "syri_majte_sfera")
    private Double syriMajteSfera;

    @Column(name = "syri_majte_cilindri")
    private Double syriMajteCilindri;

    @Column(name = "distanca_pupilare")
    private Double distancaPupilare;

    @Column(name = "shenimet", columnDefinition = "NVARCHAR(MAX)")
    private String dietat;
}