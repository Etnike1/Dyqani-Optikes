package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "Produktet")
@Data
public class Produktet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "produkt_id")
    private Long produktId;

    @ManyToOne
    @JoinColumn(name = "kategori_id", nullable = false)
    private Kategorite kategori;

    @Column(name = "emri_produktit")
    private String emriProduktit;

    private String marka;
    private String modeli;

    @Column(precision = 10, scale = 2)
    private BigDecimal cmimi;

    @Column(name = "sasia_stok")
    private Integer sasiaStok;

    private String ngjyra;
    private String materiali;

    private Boolean aktiv = true;
}