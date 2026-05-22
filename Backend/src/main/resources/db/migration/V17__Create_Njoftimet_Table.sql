CREATE TABLE Njoftimet (

    njoftim_id BIGINT IDENTITY(1,1) PRIMARY KEY,

    klient_id BIGINT NOT NULL,

    mesazhi NVARCHAR(500) NOT NULL,

    data_krijimit DATETIME DEFAULT GETDATE(),

    lexuar BIT DEFAULT 0,

    CONSTRAINT FK_Njoftimet_Klientet
        FOREIGN KEY (klient_id)
        REFERENCES Klientet(klient_id)
);