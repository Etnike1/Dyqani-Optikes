CREATE TABLE Inventari (
    inventar_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    produkt_id BIGINT NOT NULL,
    sasia_aktuale INT,
    sasia_minimale INT,
    data_perditesimit DATE,

    CONSTRAINT FK_Inventari_Produktet
    FOREIGN KEY (produkt_id)
    REFERENCES Produktet(produkt_id)
);