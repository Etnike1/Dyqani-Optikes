CREATE TABLE HistorikuVizitave (
    historiku_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    klient_id BIGINT NOT NULL,
    kontroll_id BIGINT NULL,
    data_vizites DATE,
    pershkrimi NVARCHAR(MAX) NULL,
    rekomandimi NVARCHAR(MAX) NULL,
    CONSTRAINT FK_HistorikuVizitave_Klientet FOREIGN KEY (klient_id) REFERENCES Klientet(klient_id),
    CONSTRAINT FK_HistorikuVizitave_KontrolletSyve FOREIGN KEY (kontroll_id) REFERENCES KontrolletSyve(kontroll_id)
);