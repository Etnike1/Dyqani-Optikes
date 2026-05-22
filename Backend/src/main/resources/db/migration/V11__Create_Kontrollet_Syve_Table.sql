CREATE TABLE Kontrollet_Syve (
    kontroll_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    klient_id BIGINT NOT NULL,
    punonjes_id BIGINT NOT NULL,
    recete_id BIGINT NULL,

    data_kontrollit DATE DEFAULT GETDATE(),

    rezultati NVARCHAR(MAX) NOT NULL,
    rekomandimi NVARCHAR(MAX),

    CONSTRAINT FK_KontrolletSyve_Klientet FOREIGN KEY (klient_id)
        REFERENCES Klientet(klient_id),

    CONSTRAINT FK_KontrolletSyve_Punonjesit FOREIGN KEY (punonjes_id)
        REFERENCES Punonjesit(punonjes_id),

    CONSTRAINT FK_KontrolletSyve_Recetat FOREIGN KEY (recete_id)
        REFERENCES Recetat(recete_id)
);