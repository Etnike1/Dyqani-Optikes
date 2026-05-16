package com.dyqanioptikes.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "Klientet")
@Data
public class Klientet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "klient_id")
    private Long id;

    private String emri;
    private String mbiemri;
    private String email;
    @Pattern(
            regexp = "^[0-9+ ]*$",
            message = "Numri i telefonit nuk është valid"
    )
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
