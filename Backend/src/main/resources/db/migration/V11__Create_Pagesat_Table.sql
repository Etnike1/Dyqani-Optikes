-- V7__Create_Pagesat_Table.sql

CREATE TABLE Pagesat (
    pagese_id INT IDENTITY(1,1) PRIMARY KEY,
    porosi_id INT NOT NULL,
    shuma DECIMAL(10, 2) NOT NULL,
    data_pageses DATETIME DEFAULT GETDATE(),
    metoda NVARCHAR(50) NOT NULL CHECK (metoda IN ('Cash', 'Kartelë', 'Transfer')),
    statusi NVARCHAR(50) DEFAULT 'E përfunduar',

    -- Lidhja me tabelën Porosite (One-to-One teknikisht në nivel biznesi)
    -- Përdorim UNIQUE nëse dëshirojmë që një porosi të ketë vetëm një regjistrim pagese
    CONSTRAINT FK_Pagesat_Porosite FOREIGN KEY (porosi_id)
        REFERENCES Porosite(porosi_id) ON DELETE CASCADE,

    CONSTRAINT UQ_Pagesat_Porosi UNIQUE (porosi_id)
);