CREATE TABLE Punonjesit (
    punonjes_id INT IDENTITY(1,1) PRIMARY KEY,
    emri NVARCHAR(255) NOT NULL,
    mbiemri NVARCHAR(255) NOT NULL,
    roli NVARCHAR(100),
    email NVARCHAR(255) UNIQUE,
    telefoni NVARCHAR(50),
    aktiv BIT DEFAULT 1
);
