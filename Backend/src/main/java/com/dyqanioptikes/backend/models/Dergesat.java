package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "Dergesat")
@Data
public class Dergesat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dergesa_id")
    private Integer dergesaId;

    @ManyToOne
    @JoinColumn(name = "porosi_id", referencedColumnName = "porosi_id", nullable = false)
    private Porosite porosia; // Lidhja me Porosite (që në Java e ke Long)

    @Column(name = "kompania_transportit")
    private String kompaniaTransportit;

    @Column(name = "numri_gjurmimit")
    private String numriGjurmimit;

    @NotBlank(message = "Adresa e dërgesës është e detyrueshme")
    @Column(name = "adresa_dergeses", nullable = false)
    private String adresaDergeses;

    @Column(name = "data_nisjes")
    private LocalDate dataNisjes;

    @Column(name = "data_mrrgjetjes")
    private LocalDate dataMrrgjetjes;

    @Column(name = "statusi_dergeses")
    private String statusiDergeses;
}