CREATE TABLE Produktet (
    produkt_id INT IDENTITY(1,1) PRIMARY KEY,
    kategori_id INT NOT NULL,
    emri_produktit NVARCHAR(100) NOT NULL,
    marka NVARCHAR(100),
    modeli NVARCHAR(100),
    cmimi DECIMAL(10,2),
    sasia_stok INT,
    ngjyra NVARCHAR(50),
    materiali NVARCHAR(50),
    aktiv BIT DEFAULT 1,

    CONSTRAINT FK_Produktet_Kategorite FOREIGN KEY (kategori_id)
        REFERENCES Kategorite(kategori_id)
);