package com.dyqanioptikes.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.*;
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

    @Positive(message = "Çmimi duhet të jetë pozitiv")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal cmimi;

    @Min(value = 0, message = "Stoku nuk mund të jetë negativ")
    @Column(name = "sasia_stok", nullable = false)
    private Integer sasiaStok;

    private String ngjyra;
    private String materiali;

    private Boolean aktiv = true;
}
