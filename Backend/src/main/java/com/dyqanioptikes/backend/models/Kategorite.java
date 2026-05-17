package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "Kategorite")
@Data
public class Kategorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kategori_id")
    private Long kategoriId;

    @NotBlank
    @Column(name = "emri_kategorise", nullable = false)
    private String emriKategorise;

    private String pershkrimi;

    private Boolean aktive = true;
}
