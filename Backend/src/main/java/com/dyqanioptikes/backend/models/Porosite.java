package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Porosite")
@Data
public class Porosite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "porosi_id")
    private Long porosiId;


    @ManyToOne
    @JoinColumn(name = "klient_id", referencedColumnName = "id", nullable = false)
    private Klientet klient;


    @ManyToOne
    @JoinColumn(name = "recete_id", referencedColumnName = "recete_id", nullable = false)
    private Recetat receta;


    @ManyToOne
    @JoinColumn(name = "punonjes_id", referencedColumnName = "punonjes_id", nullable = false)
    private Punonjesit punonjesi;

    @Column(name = "data_porosise", updatable = false)
    private LocalDate dataPorosise;

    @Column(name = "totali", precision = 10, scale = 2)
    private BigDecimal totali;

    @Column(name = "statusi")
    private String statusi;

    @Column(name = "data_gatshmerise")
    private LocalDate dataGatshmerise;

    @PrePersist
    protected void onCreate() {
        if (this.dataPorosise == null) {
            this.dataPorosise = LocalDate.now();
        }
    }
}