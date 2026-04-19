CREATE TABLE Recetat (
    recete_id INT IDENTITY(1,1) PRIMARY KEY, -- Rritet automatikisht (1, 2, 3...)
    klient_id INT NOT NULL,                  -- Lidhja me tabelen Klientet
    mjeku_emri NVARCHAR(100) NOT NULL,
    data_recetes DATE DEFAULT GETDATE(),     -- Vendos daten e sotme automatikisht
    
    -- Parametrat e syve (përdorim DECIMAL për saktësi optike)
    syri_djathte_sfera DECIMAL(4, 2),
    syri_djathte_cilindri DECIMAL(4, 2),
    syri_majte_sfera DECIMAL(4, 2),
    syri_majte_cilindri DECIMAL(4, 2),
    
    distanca_pupilare DECIMAL(5, 2),         -- p.sh. 62.5 mm
    shenimet NVARCHAR(MAX),                  -- Per tekste te gjata
    
    -- Krijimi i lidhjes (Foreign Key) me tabelen Klientet
    CONSTRAINT FK_KlientiReceta FOREIGN KEY (klient_id) 
    REFERENCES Klientet(id) ON DELETE CASCADE
);