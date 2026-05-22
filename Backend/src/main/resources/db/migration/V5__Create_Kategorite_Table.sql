CREATE TABLE Kategorite (
    kategori_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    emri_kategorise NVARCHAR(100) NOT NULL,
    pershkrimi NVARCHAR(200),
    aktive BIT DEFAULT 1
);