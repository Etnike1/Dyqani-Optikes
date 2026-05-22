CREATE TABLE Porosite (
    porosi_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    klient_id BIGINT NOT NULL,
    recete_id BIGINT NOT NULL,
    punonjes_id BIGINT NOT NULL,

    data_porosise DATE DEFAULT GETDATE(),
    totali DECIMAL(10,2) NOT NULL,
    statusi NVARCHAR(50) DEFAULT 'E hapur',
    data_gatshmerise DATE,

    CONSTRAINT FK_Porosite_Klientet FOREIGN KEY (klient_id)
        REFERENCES Klientet(klient_id),

    CONSTRAINT FK_Porosite_Recetat FOREIGN KEY (recete_id)
        REFERENCES Recetat(recete_id),

    CONSTRAINT FK_Porosite_Punonjesit FOREIGN KEY (punonjes_id)
        REFERENCES Punonjesit(punonjes_id)
)
