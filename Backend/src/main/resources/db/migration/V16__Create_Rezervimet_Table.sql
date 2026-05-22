CREATE TABLE Rezervimet (

    rezervim_id BIGINT IDENTITY(1,1) PRIMARY KEY,

    klient_id BIGINT NOT NULL,
    punonjes_id BIGINT NOT NULL,

    data_rezervimit DATE NOT NULL,
    ora_rezervimit TIME NOT NULL,

    statusi NVARCHAR(50) DEFAULT 'Ne pritje',

    shenime NVARCHAR(500),

    CONSTRAINT FK_Rezervimet_Klientet
        FOREIGN KEY (klient_id)
        REFERENCES Klientet(klient_id),

    CONSTRAINT FK_Rezervimet_Punonjesit
        FOREIGN KEY (punonjes_id)
        REFERENCES Punonjesit(punonjes_id)
);