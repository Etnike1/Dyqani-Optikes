CREATE TABLE Dergesat (
    dergesa_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    porosi_id BIGINT NOT NULL,

    kompania_transportit NVARCHAR(100),
    numri_gjurmimit NVARCHAR(100),
    adresa_dergeses NVARCHAR(255) NOT NULL,

    data_nisjes DATE,
    data_arritjes DATE,
    statusi_dergeses NVARCHAR(50) DEFAULT 'Ne pergatitje',

    CONSTRAINT FK_Dergesat_Porosite FOREIGN KEY (porosi_id)
        REFERENCES Porosite(porosi_id)
);