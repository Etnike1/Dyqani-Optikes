package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "Inventari")
@Data
public class Inventari {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventar_id")
    private Long inventarId;

    @ManyToOne
    @JoinColumn(name = "produkt_id", nullable = false)
    private Produktet produkt;

    @Column(name = "sasia_aktuale")
    private Integer sasiaAktuale;

    @Column(name = "sasia_minimale")
    private Integer sasiaMinimale;

    @Column(name = "data_perditesimit")
    private LocalDate dataPerditesimit;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.dataPerditesimit = LocalDate.now();
    }
}
