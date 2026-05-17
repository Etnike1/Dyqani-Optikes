package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Lentet")
@Data
public class Lentet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lente_id")
    private Long lenteId;

    @NotBlank
    @Column(name = "lloji_lentes", nullable = false)
    private String llojiLentes;

    private String prodhuesi;
    private String indeksi;
    private String veshja;

    @Column(precision = 10, scale = 2)
    private BigDecimal cmimi;

    @Column(name = "sasia_stok")
    private Integer sasiaStok;
}
