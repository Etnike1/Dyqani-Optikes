package com.dyqanioptikes.backend.models;

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
    @NotBlank
    @Column(nullable = false)
    private String emri;

    @NotBlank
    @Column(nullable = false)
    private String mbiemri;

    @Email
    private String email;

    @Pattern(
            regexp = "^[0-9+ ]*$",
            message = "Numri i telefonit nuk është valid"
    )
    private String telefoni;
    @Column(name = "data_lindjes")
    private LocalDate dataLindjes;
    private String adresa;

    @Column(name = "data_regjistrimit", updatable = false)
    private LocalDate dataRegjistrimit;

    @PrePersist
    protected void onCreate() {
        this.dataRegjistrimit = LocalDate.now();
    }
}
