package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Detajet_Porosise")
@Data
public class DetajetPorosise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detaj_id")
    private Integer detajId;

    @Column(name = "sasia")
    private Integer sasia;

    @Column(name = "cmimi_njesi")
    private Double cmimiNjesi;

    @Column(name = "nentotali", insertable = false, updatable = false)
    private Double nentotali; // Ky vjen nga SQL, prandaj insertable = false

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
