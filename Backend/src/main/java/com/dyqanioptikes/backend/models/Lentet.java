package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "Lentet")
@Data
public class Lentet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lente_id")
    private Long lenteId;

    @Column(name = "lloji_lentes")
    private String llojiLentes;

    private String prodhuesi;
    private String indeksi;
    private String veshja;

    @Column(precision = 10, scale = 2)
    private BigDecimal cmimi;

    @Column(name = "sasia_stok")
    private Integer sasiaStok;
}
