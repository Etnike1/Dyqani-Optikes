package com.dyqanioptikes.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "Furnitoret")
@Data
public class Furnitoret {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "furnitor_id")
    private Long furnitorId;

    @Column(name = "emri_kompanise")
    private String emriKompanise;

    @Column(name = "personi_kontaktit")
    private String personiKontaktit;

    private String email;
    @Pattern(
            regexp = "^[0-9+ ]*$",
            message = "Numri i telefonit nuk është valid"
    )
    private String telefoni;

    @Column(name = "produktet_furnizuara")
    private String produktetFurnizuara;
}
