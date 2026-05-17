CREATE TABLE Markat (
    marka_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    emri_markes NVARCHAR(100) NOT NULL,
    vendi_origjines NVARCHAR(100),
    pershkrimi NVARCHAR(255),
    aktive BIT DEFAULT 1
);