package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Njoftimet")
@Data
public class Njoftimet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "njoftim_id")
    private Long njoftimId;

    @ManyToOne
    @JoinColumn(name = "klient_id", nullable = false)
    private Klientet klienti;

    @NotBlank
    @Column(nullable = false)
    private String mesazhi;

    @Column(name = "data_krijimit")
    private LocalDateTime dataKrijimit;

    private Boolean lexuar = false;

    @PrePersist
    protected void onCreate() {
        this.dataKrijimit = LocalDateTime.now();
    }
}