package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "Klientet")
@Data
public class Klientet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emri;
    private String mbiemri;
    private String email;
    private String telefoni;
    private LocalDate dataLindjes;
    private String adresa;

    @Column(name = "data_regjistrimit", updatable = false)
    private LocalDate dataRegjistrimit;

    @PrePersist
    protected void onCreate() {
        this.dataRegjistrimit = LocalDate.now();
    }
}