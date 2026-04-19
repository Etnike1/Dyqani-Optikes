CREATE TABLE Klientet (
    klient_id INT IDENTITY(1,1) PRIMARY KEY,

    emri NVARCHAR(100) NOT NULL,
    mbiemri NVARCHAR(100) NOT NULL,

    email NVARCHAR(150) UNIQUE,
    telefoni NVARCHAR(20),

    data_lindjes DATE,
    adresa NVARCHAR(255),

    data_regjistrimit DATETIME DEFAULT GETDATE()
);