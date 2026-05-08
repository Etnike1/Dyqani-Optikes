CREATE TABLE Detajet_Porosise (
    detaj_id INT IDENTITY(1,1) PRIMARY KEY,
    porosi_id INT NOT NULL,
    produkt_id INT NULL, -- Mund të jetë NULL nëse shitet vetëm lente
    lente_id INT NULL,   -- Mund të jetë NULL nëse shitet vetëm kornizë/produkt tjetër
    sasia INT NOT NULL CHECK (sasia > 0),
    cmimi_njesi DECIMAL(10,2) NOT NULL,
    nentotali AS (sasia * cmimi_njesi), -- Llogaritet automatikisht në SQL

    CONSTRAINT FK_Detajet_Porosia FOREIGN KEY (porosi_id) REFERENCES Porosite(porosi_id),
    CONSTRAINT FK_Detajet_Produkti FOREIGN KEY (produkt_id) REFERENCES Produktet(produkt_id),
    CONSTRAINT FK_Detajet_Lente FOREIGN KEY (lente_id) REFERENCES Lentet(lente_id)
);