package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Pagesat")
@Data
public class Pagesat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pagesa_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "porosi_id", nullable = false)
    private Porosite porosia;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal shuma;

    @Column(name = "data_pageses")
    private LocalDateTime dataPageses;

    @Column(name = "metoda_pageses")
    private String metodaPageses; // Kesh, Kartelë, etj.

    @PrePersist
    protected void onCreate() {
        this.dataPageses = LocalDateTime.now();
    }
}