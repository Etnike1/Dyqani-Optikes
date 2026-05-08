CREATE TABLE Lentet (
    lente_id INT IDENTITY(1,1) PRIMARY KEY,
    lloji_lentes NVARCHAR(100) NOT NULL,
    prodhuesi NVARCHAR(100),
    indeksi NVARCHAR(50),
    veshja NVARCHAR(100),
    cmimi DECIMAL(10,2),
    sasia_stok INT
);