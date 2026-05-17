package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Markat")
@Data
public class Markat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "marka_id")
    private Long markaId;

    @Column(name = "emri_markes", nullable = false)
    private String emriMarkes;

    @Column(name = "vendi_origjines")
    private String vendiOrigjines;

    private String pershkrimi;

    private Boolean aktive = true;
}
