package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "Punonjesit")
@Data
public class Punonjesit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "punonjes_id")
    private Long punonjesId;

    @NotBlank
    @Column(nullable = false)
    private String emri;

    @Column(nullable = false)
    private String mbiemri;

    private String roli;

    @Column(unique = true)
    private String email;

    private String telefoni;

    private Boolean aktiv = true;
}
