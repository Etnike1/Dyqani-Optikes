CREATE TABLE Garancite (
    garancia_id INT IDENTITY(1,1) PRIMARY KEY,
    porosi_id INT NOT NULL,
    klient_id INT NOT NULL,
    produkt_id INT NULL,
    lente_id INT NULL,

    data_fillimit DATE NOT NULL,
    data_skadimit DATE NOT NULL,
    kushtet NVARCHAR(500) NOT NULL,

    -- Lidhja me tabelën e Porosive
    CONSTRAINT FK_Garancite_Porosite FOREIGN KEY (porosi_id)
        REFERENCES Porosite(porosi_id),

    -- Lidhja me tabelën e Klientëve
    CONSTRAINT FK_Garancite_Klientet FOREIGN KEY (klient_id)
        REFERENCES Klientet(klient_id),

    -- Lidhja me tabelën e Produkteve
    CONSTRAINT FK_Garancite_Produktet FOREIGN KEY (produkt_id)
        REFERENCES Produktet(produkt_id),

    -- Lidhja me tabelën e Lenteve
    CONSTRAINT FK_Garancite_Lentet FOREIGN KEY (lente_id)
        REFERENCES Lentet(lente_id)
);