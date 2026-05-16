CREATE TABLE Recetat (
    recete_id INT IDENTITY(1,1) PRIMARY KEY,
    klient_id INT NOT NULL,

    mjeku_emri NVARCHAR(150),
    data_recetes DATE DEFAULT GETDATE(),

    -- Parametrat optikë (zakonisht përdoren numra me presje, psh: -2.25)
    syri_djathte_sfera DECIMAL(4,2),
    syri_djathte_cilindri DECIMAL(4,2),

    syri_majte_sfera DECIMAL(4,2),
    syri_majte_cilindri DECIMAL(4,2),

    distanca_pupilare DECIMAL(5,2), -- psh: 64.5 mm

    shenimet NVARCHAR(MAX),

    -- Lidhja 1:N (Një klient mund të ketë shumë receta)
    CONSTRAINT FK_Recetat_Klientet FOREIGN KEY (klient_id)
        REFERENCES Klientet(klient_id)
        ON DELETE CASCADE
);
