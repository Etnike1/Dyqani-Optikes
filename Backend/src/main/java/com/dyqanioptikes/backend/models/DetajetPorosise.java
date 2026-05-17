package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "Detajet_Porosise")
@Data
public class DetajetPorosise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detaj_id")
    private Integer detajId;

    @NotNull(message = "Sasia është e detyrueshme")
    @Min(value = 1, message = "Sasia duhet të jetë minimum 1")
    @Column(name = "sasia", nullable = false)
    private Integer sasia;

    @NotNull(message = "Cmimi është i detyrueshëm")
    @Column(name = "cmimi_njesi", nullable = false)
    private Double cmimiNjesi;

    @Column(name = "nentotali", insertable = false, updatable = false)
    private Double nentotali;

    @ManyToOne
    @JoinColumn(name = "porosi_id", nullable = false)
    private Porosite porosia;

    @ManyToOne
    @JoinColumn(name = "produkt_id")
    private Produktet produkti;

    @ManyToOne
    @JoinColumn(name = "lente_id")
    private Lentet lentet;
}