CREATE TABLE Furnitoret (
    furnitor_id INT IDENTITY(1,1) PRIMARY KEY,
    emri_kompanise NVARCHAR(100) NOT NULL,
    personi_kontaktit NVARCHAR(100),
    email NVARCHAR(100),
    telefoni NVARCHAR(50),
    produktet_furnizuara NVARCHAR(200)
);