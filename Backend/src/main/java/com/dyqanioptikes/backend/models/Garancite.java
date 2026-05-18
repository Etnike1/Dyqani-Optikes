package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "Garancite")
@Data
public class Garancite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "garancia_id")
    private Integer garanciaId; // ID-ja e vetë garancisë mbetet Integer si tabelat e tjera të vogla

    @NotNull(message = "Data e fillimit është e detyrueshme")
    @Column(name = "data_fillimit", nullable = false)
    private LocalDate dataFillimit;

    @NotNull(message = "Data e skadimit është e detyrueshme")
    @Column(name = "data_skadimit", nullable = false)
    private LocalDate dataSkadimit;

    @NotBlank(message = "Kushtet e garancisë janë të detyrueshme")
    @Column(name = "kushtet", length = 500)
    private String kushtet;

    @ManyToOne
    @JoinColumn(name = "porosi_id", referencedColumnName = "porosi_id", nullable = false)
    private Porosite porosia; // Do të lidhet saktë me Porosite (që i ke Long)

    @ManyToOne
    @JoinColumn(name = "klient_id", referencedColumnName = "klient_id", nullable = false)
    private Klientet klienti; // Do të lidhet saktë me Klientet (që i ke Long)

    @ManyToOne
    @JoinColumn(name = "produkt_id")
    private Produktet produkti;

    @ManyToOne
    @JoinColumn(name = "lente_id")
    private Lentet lentet;
}